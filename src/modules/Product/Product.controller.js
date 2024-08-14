import slugify from "slugify"
import { appError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { Product } from "../../../Database/model/product.model.js"
import { deleteOne, getAll, getOne } from "../handlers/handlers.js"

const addProduct = catchError(async (req ,res ,next)=>{
    req.body.slug = slugify(req.body.title)
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images = req.files.images.map(img=>img.filename)
    let product = new Product(req.body)
    await product.save()
res.json({message:"success", product})
})

const getAllProduct = getAll(Product)

const getProduct = getOne(Product)
const updateProduct = catchError(async (req ,res ,next)=>{
    // req.body.slug = slugify(req.body.title)
    let product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})

    product ||  next(new appError("product not found",404))
    !product || res.json({message:"success", product})
})

const deleteProduct = deleteOne(Product)




export{
    addProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct
}