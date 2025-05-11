const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const ObjectId= Schema.Types.ObjectId;

const onGoingTradeSchema= Schema({
  trade:{
    type:ObjectId,
    ref:"Trade",
    required:true
  },
  status:{
    type:String,
    enum:["ongoing","payment failure","completed"],
    required:true
  },
  startTime:{
    type:Date,
    required:true
  },
  endTime:{
    type:Date,
    required:true,
  },
  payment:{
    type:ObjectId,
    ref:'Payment',
    required:true
  }
},{timestamps:true});

export const OnGoingTrade = mongoose.model("OnGoingTrade",onGoingTradeSchema);