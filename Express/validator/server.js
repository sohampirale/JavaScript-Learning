const express=require('express')
const cors=require('cors')
const app=express();

const {query, validationResult} =require('express-validator')

app.use(cors())
let name='';

// function nameValidator(req,res,next){
//   query('name').notEmpty(req,res);
//   const nameValidatorResult=validationResult(req);
//   if(nameValidator.isEmpty()){
//     next();
//   } else {
//     res.json({
//       message:'Name not foudn in the query'
//     })
//   }
// }

app.get('/hello',query('name').notEmpty().withMessage('Name is required brother').escape(),query('age').notEmpty().withMessage('Age is required brother'),(req,res)=>{
  console.log('request received at /hello');
  const result=validationResult(req)
  if(result.isEmpty()){
    res.json({
      message:'Hello '+req.query.name+',Your age is : '+req.query.age
    })
  } else {
    res.json({
      error:result.array()
    })
  }
})

app.listen(3000,()=>{
  console.log('server listening to port-3000');
})

app.use((err,req,res,next)=>{
  console.log('Error occured : '+err.message);
  res.json({
    message:'Error occured : '+err.message
  })
})