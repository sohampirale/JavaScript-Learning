const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const ObjectId= Schema.Types.ObjectId;


const paymentSchema = Schema({
  amount:{
    type:Number,
    required:true
  },
  description:{
    type:String
  },
  sender:{
    type:ObjectId,
    ref:"User",
    required:true
  },
  receiver:{
    type:ObjectId,
    ref:"User",
    required:true
  },
  status:{
    type:String,
    required:true,
    enum:["success","failure"]
  },
  time:{
    type:Date,
    default:Date.now
  }
},{timestamps:true});

export const Payment = mongoose.model("Payment",paymentSchema);