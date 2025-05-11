const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const addressSchema = mongoose.Schema({
  addressLine1: {
    type: String,
    required: true
  },
  addressLine2: {
    type: String
  },
  addressLine3: {
    type: String
  },
  pinCode: {
    type: Number,
    required: true
  },
  streetMark: {
    type: String
  },
  city: {
    type: String,
    required: true,
    tolowercase:true
  },
  state: {
    type: String,
    required: true,
    tolowercase:true
  },
  country: {
    type: String,
    required: true,
    tolowercase:true
  }
}, { timestamps: true })

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    tolowercase:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    tolowercase:true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: addressSchema,
    required: true
  },
  phoneNo: {
    type: String,
    required: true
  },
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
    default: null
  },
  pendingOwnerTrades: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trade",
      default: []
    }
  ],
  pendingRenterTrades: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trade",
      default: []
    }
  ],
  onGoingOwnerTrades: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "OngGoingTrade",
    default: []
  }],
  onGoingRenterTrades: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "OngGoingTrade",
    default: []
  }],
  completedOwnerTrades: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompletedTrade",
    default: []
  }],
  completedRenterTrades: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompletedTrade",
    default: []
  }],
  postedBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "BookCopy",
    default: []
  }],
  rating: {
    type: ObjectId,
    ref: "UserRating",
    default: null
  },
  starredBooks: [{
    type: ObjectId,
    ref: "BookCopy",
    default: []
  }]
}, {
  timestamps: true
})

const User = mongoose.model("User", userSchema);
module.exports = User;