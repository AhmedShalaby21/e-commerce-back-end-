import mongoose, { Types } from "mongoose";
 const schema = new mongoose.Schema({
    comment: String,

    user:{
        type:Types.ObjectId,
        ref:'User',
        
    },
    rate:{
        type: Number,
        min: 0,
        max: 5,
    },
    product:{
        type:Types.ObjectId,
        ref:'Product',
        required:true 
    },
   
 },{timestamps:true , versionKey: false})

 schema.pre(/^find/,function(){
    this.populate('user','name')
 })

 export const Review = mongoose.model('Review' , schema) 