const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId =  Schema.TYpes.ObjectId;

const ratedBySchema =  Schema({
  user:{
    type:ObjectId,
    ref:"User",
    required:true
  },
  individualRating:{
    type:Number,
    required:true,
    min: [minValue, 'Minimum rating can be 0'],
    max: [maxValue, 'Maximum rating can be 5']
  },
  trade:{
    type:ObjectId  //ref given from the backend
  },
  comment:{
    type:String
  }
})

const bookRatingSchema = Schema({
  avgRating:{
    type:Number,
    default:0
  },  
  ratedBy:[{
    type:ratedBySchema
  }]
},{timestamps:true});

export const BookRating = mongoose.model("BookRating",bookRatingSchema);