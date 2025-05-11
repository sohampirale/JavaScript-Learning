const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const ObjectId= Schema.Types.ObjectId;

const walletSchema = Schema({
  user:{
    type:ObjectId,
    ref:"User",
    required:true
  },
  spentMoney:{
    type:Number,
    default:0
  },
  earnedMoney:{
    type:Number,
    default:0
  },
  balance:{
    type:Number,
    default:0
  },
  creditedTransactions:[{
    type:ObjectId,
    ref:"Payment"
  }],
  debitedTransactions:[{
    type:ObjectId,
    ref:"Payment"
  }],
  allTransactions:[{
    type:ObjectId,
    ref:"Payment"
  }]
},{timestamps:true});

export const Wallet = mongoose.model("Wallet",walletSchema);