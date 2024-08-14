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
   logo: String,
   createdBy:{
      type:Types.ObjectId,
      ref:'User'
   }
 },{timestamps:true , versionKey: false})

 schema.post('init',function(doc) {
   doc.logo = process.env.BASE_URL + "brands/" + doc.logo
})

 export const Brand = mongoose.model('Brand' , schema) 