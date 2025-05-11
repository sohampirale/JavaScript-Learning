const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const bookSchema=Schema({  
  bookname:{
    type:String,
    required:true,
    tolowercase:true
  },
  author:{
    type:String,
    tolowercase:true
  },
  edition:{
    type:Number
  }
},{timestamps:true});

const Book = mongoose.model("Book",bookSchema);
module.exports = Book