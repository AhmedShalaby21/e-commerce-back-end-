import mongoose, { Types } from "mongoose";
 const schema = new mongoose.Schema({
    title:{
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
    description:{
        type: String,
        required: true,
        minLength: 30,
        maxLength: 2000 

    },
    imageCover: String,
    images : [String],
    price:{
        type: Number,
        min: 0,
        required: true
    },
    priceAfterDiscount:{
        type: Number,
        min: 0,
        required: true,

    },
    sold: Number,
    stock:{
        type: Number,
        min: 0

    },
    category:{
        type: Types.ObjectId,
        ref:'Category'
    },
    subcategory:{
        type: Types.ObjectId,
        ref:'SubCategory'
    },
    brand:{
        type: Types.ObjectId,
        ref:'Brand'
    },
    rateAvg:{
        type: Number,
        min: 0,
        max: 5,
    },
    rateCount: Number,
    createdBy:{
        type:Types.ObjectId,
        ref:'User'
     }

 },{timestamps:true , versionKey: false ,toJSON:{virtuals:true},id:false})

schema.virtual('myReviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
  });

  schema.pre(/^find/,function(){
    this.populate('myReviews')
 })

 schema.post('init',function(doc) {
    if(doc.imageCover) process.env.BASE_URL + "product/" + doc.imageCover
    if(doc.images) doc.images.map(img =>process.env.BASE_URL + "product/"+img)
 })

 export const Product = mongoose.model('Product' , schema) 