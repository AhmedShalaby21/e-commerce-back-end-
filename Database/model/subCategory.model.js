import mongoose, { Types } from "mongoose";
 const schema = new mongoose.Schema({
    name:{
        type: String,
        unique: [true, 'Name is Required'],
        trim: true,
        required: true,
        minLength: [2,"Too Short Category Name"]
    },
    slug:{
       type: String,
       lowercase: true,
       required: true,

    },
    category:{
        type: Types.ObjectId,
        ref:'Category'
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User'
     }
 },{timestamps:true , versionKey: false})

 export const SubCategory = mongoose.model('SubCategory' , schema) 