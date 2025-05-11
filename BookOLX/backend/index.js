const express = require("express")
const jwt= require("jsonwebtoken")
const app= express();
const mongoose= require("mongoose");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const JWT_SECRET="SOHAMPIRALE";

//importing models
const User = require("./models/user.models.js");
const Book = require("./models/book.models.js");
const BookCopy = require("./models/bookCopy.models.js");

async function connectDb(){
  try{
    await mongoose.connect("mongodb+srv://sohampirale20504:NevilleMongoDB@demo.3du8dza.mongodb.net/learningMongo");
    console.log("DB connected successfully!");
  } catch(err){
    console.log("DB connection failed");
  }
}

connectDb();

app.use(express.json());

app.listen(3000,()=>{
  console.log("Server runnign on port 3000");
})

app.post("/login",async (req,res)=>{
  
  const username=req.body.username;
  const email=req.body.email;
  const password=req.body.password;
  if(!password){
    return res.status(403).json({msg:"Password is needed"});
  }

  let user;
  if(username){
    user= await User.findOne({
      username
    })
  } else if(email){
    user= await User.findOne({
      email
    })
  } else {
    return res.status(403).json({
      msg:"Email or Username is required"
    })
  }

  if(!user){
    return res.status(403).json({
      msg:"User does not exists in the database"
    })
  }
  
  const compareResult =await bcrypt.compare(password,user.password);

  if(compareResult){
    return res.status(200).json({
      msg:"Signup successfull",
      token:jwt.sign({
        id:user._id.toString()
      },JWT_SECRET)
    })
  } else {
    return res.status(403).json({
      msg:"Incorrect Password"
    })
  }

})

app.post("/signup",async(req,res)=>{
  const requiredBody= z.object({
    username:z.string().min(5),
    email:z.string().email().min(3,"minimum length of email should be 4"),
    password:z.string()
      .regex(/[a-z]/,"ATleast 1 lowercase character is necessary")
      .regex(/[A-Z]/,"ATleast 1 uppercase character is necessary")
      .regex(/[0-9]/,"Atleast 1 digit is necessary")
      .regex(/[^a-zA-Z0-9]/,"Atleast 1 Special character is necessary"),
  })
  
  const parsedBody= requiredBody.safeParse(req.body);
  if(parsedBody.success){
    console.log("Input validation sucessfull");
  } else {
    console.log("Incorrect data format");
    return res.status(403).json({
      msg:"Incorrect Data format",
      error:parsedBody.error
    })
  }

  const username = req.body.username;
  const email = req.body.email;
  const phoneNo = req.body.phoneNo;
  const addressSchema =  req.body.addressSchema;
  const password= req.body.password;
  const hashedPW= await bcrypt.hash(password,5);

  const user=await User.create({
    username,
    email,
    password:hashedPW,
    address:addressSchema,
    phoneNo
  })

  // console.log(user);
  
  console.log('new user inserted successfully!');

  res.status(200).json({
    msg:"Signup successfull",
    token:jwt.sign({
      id:user._id
    },JWT_SECRET)
  })
})

app.post("/deleteUser",async(req,res)=>{
  const token=req.body.token;
  const {id} = jwt.decode(token);

  if(User.exists({_id:id})){
    console.log("request user exists in the database");    
    await User.deleteOne({
      _id : id
    })

    res.status(200).json({
      msg:"requested user deleted from the database"
    })
  } else {
    console.log("Requested user does not exists in the database");
    res.status(200),json({
      msg:"request user exists in the database"
    })
  }
})

app.get("/test",(req,res)=>{
  const token=req.body.token;
  try{
    jwt.verify(token,JWT_SECRET);
    res.status(200).json({msg:"Valid token"});
  } catch(err){
    res.status(403).json({
      msg:"Invalid Token"
    })
  }
})

app.post("/starABook",(req,res)=>{
  const {token,bookId}=req.body;
  const {id} = jwt.decode(token);

  res.json({msg:"Req received at /starABook"})
})

app.post("/requestBook",(req,res)=>{

})

function isValidObjectId(id){
  return mongoose.Types.ObjectId.isValid(id);
}

app.post("/postBook",async(req,res)=>{
  console.log('inside /postBook');

  let book,newBookCopy;

  const requiredBookSchemaBody=z.object({
    bookname:z.string().optional(),
    bookId:z.string().optional(),
    author:z.string().optional(),
    edition:z.number().optional()
  })

  const requiredBookCopySchemaBody=z.object({
    rentPerDayPrice:z.number(),
    condition:z.string().optional(),
    availaible:z.boolean().optional(),
    rating:z.string()
      .refine(isValidObjectId,{msg:"Invalid ObjectId of rating Obj given"})
      .optional()
  })

  const basicRequirementSchemaBody=z.object({
    BookSchema:requiredBookSchemaBody,
    BookCopySchema:requiredBookCopySchemaBody,
    token:z.string()
  })

  console.log("req.body = "+JSON.stringify(req.body));
  
  const parsedBasicRequirementSchemaBody = basicRequirementSchemaBody.safeParse(req.body);

  if(!parsedBasicRequirementSchemaBody.success){
    return res.status(403).json({
      msg:"Insufficient data provided",
      error:parsedBasicRequirementSchemaBody.error
    })
  }

  const {BookSchema,BookCopySchema} = parsedBasicRequirementSchemaBody.data;
  
  const token=req.body.token;
  const {id} = jwt.decode(token);
  console.log("id of user : "+id);
  
  const user=await User.findOne({
    _id:id
  })

  if(!user){
    return res.status(404).json({
      msg:"User does not exists in the DB"
    })
  }
  const {bookname,bookId,author,edition} = BookSchema;
  const {availaible,condition,rentPerDayPrice,rating} = BookCopySchema;

  if(bookId){
    book=await Book.findOne({
      _id:bookId
    })
  } else if(bookname){
    book=await Book.findOne({
      bookname
    })
  } else {
    return res.status(403).json({
      msg:"Bookname or Book Id is necessary to post it"
    })
  }
 
  if(book){
    console.log("book : "+bookname+" already exists");
     newBookCopy=await BookCopy.create({
      book:book._id,
      owner:id,
      availaible:availaible?availaible:false,
      condition:condition?condition:null,
      rentPerDayPrice,
      rating:rating?rating:null
    })
  } else {
    console.log("book : "+bookname+" created first!");
    book=await  Book.create({
      bookname,
      author,
      edition
    })
     newBookCopy=await BookCopy.create({
      "book":book._id,
      owner:id,
      availaible:availaible?availaible:false,
      condition:condition?condition:null,
      rentPerDayPrice,
      rating:rating?rating:null
    })
  }
  user.postedBooks.push(newBookCopy._id);
  await user.save();
  res.status(200).json({
    msg:"Book : "+bookname+" posted successfull"
  })
})

// app.use((err,req,res,next)=>{
//   return res.status(500).json({msg:"Something went wrong"})
// })