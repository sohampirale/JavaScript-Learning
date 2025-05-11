const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const ObjectId= Schema.Types.ObjectId;

const completedTradeSchema= Schema({
  status:{
    type:String,
    required:true,
    enum:["completed","not completed"]
  },
  onGoingTrade:{
    type:ObjectId,
    ref:"OnGoingTrade",
    required:true
  },
  clientReturnedTime:{
    type:Date,
    required:true
  },
  clientReturnAggreement:{
    type:Boolean,
    default:false
  },
  ownerReceivedTime:{
    type:Date,
    required:true
  },
  ownerReceiveAggreement:{
    type:Boolean,
    default:false
  }
},{timestamps:true});


export const CompletedTrade = mongoose.model("CompletedTrade",completedTradeSchema);