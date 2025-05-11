const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=mongoose.Schema.Types.ObjectId;


const bookCopySchema=Schema({
  book:{
    type:ObjectId,
    ref:"Book",
    required:true
  },
  owner:{
    type:ObjectId,
    ref:"User",
    required:true
  },
  availaible:{
    type:Boolean,
    default:true
  },
  condition:{
    type:String
  },
  rentPerDayPrice:{
    type:Number,
    required:true
  },
  rating:{
    type:ObjectId,
    ref:"BookRating"
  } 
},{timestamps:true})

const BookCopy= mongoose.model("BookCopy",bookCopySchema);
module.exports = BookCopy;