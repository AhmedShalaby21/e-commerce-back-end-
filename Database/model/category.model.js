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
       unique: [true, 'Name is Required'],


    },
    image: String,
    createdBy:{
      type:Types.ObjectId,
      ref:'User'
   }
 },{timestamps:true , versionKey: false})


   schema.post('init',function(doc) {
      doc.image = process.env.BASE_URL + "categories/" + doc.image
   })
 export const Category = mongoose.model('Category' , schema) 