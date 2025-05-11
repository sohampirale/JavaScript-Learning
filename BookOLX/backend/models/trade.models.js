const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tradeSchema = Schema({
  owner: {
    type: ObjectId,
    ref: "User"
  },
  client: {
    type: ObjectId,
    ref: "User"
  },
  book: {
    type: ObjectId,
    ref: "BookCopy"
  },
  clientAggreementTime: {
    type: Date,
    default: null
  },
  clientAggreement: {
    type: Boolean,
    default: false
  },
  ownerAggreementTime: {
    type: Date
  },
  ownerAggreement: {
    type: Boolean,
    default: false
  },
  rentPerDayPrice: {
    type: Number,
    required: true
  },
  durationInDays: {
    type: String,
    default: "7d"
  },
  dealPrice: {
    type: Number,
    required: true
  }
}, { timestamps: true })

export const Trade = mongoose.model("Trade", tradeSchema);