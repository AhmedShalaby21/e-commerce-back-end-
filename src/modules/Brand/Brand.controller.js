import slugify from "slugify"
import { Brand } from "../../../Database/model/brand.model.js"
import { appError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne, getAll, getOne } from "../handlers/handlers.js"

const addBrand = catchError(async (req ,res ,next)=>{
    req.body.slug = slugify(req.body.name)
   req.body.logo = req.file.filename
    let brand = new Brand(req.body)
    await brand.save()
res.json({message:"success", brand})
})

const getAllBrands = getAll(Brand)

const getBrand = getOne(Brand)
const updateBrand = catchError(async (req ,res ,next)=>{
   if(req.body.slug ) req.body.slug = slugify(req.body.name)
   if(req.file) req.body.logo = req.file.filename

    let brand = await Brand.findByIdAndUpdate(req.params.id,req.body,{new:true})
    
    brand ||  next(new appError("brand not found",404))
    !brand || res.json({message:"success", brand})
})

const deleteBrand = deleteOne(Brand)




export{
    addBrand,
    getAllBrands,
    getBrand,
    updateBrand,
    deleteBrand
}