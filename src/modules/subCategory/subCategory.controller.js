import slugify from "slugify"
import { appError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { SubCategory } from "../../../Database/model/subCategory.model.js"
import { deleteOne, getOne } from "../handlers/handlers.js"

const addSubCategory = catchError(async (req ,res ,next)=>{
    req.body.slug = slugify(req.body.name)
    let subCategory = new SubCategory(req.body)
    await subCategory.save()
res.json({message:"success", subCategory})
})

const getAllSubCategories = catchError(async (req ,res ,next)=>{
    let filterObj = {}
    if(req.params.category) filterObj.category = req.params.category
    
    let subcategories = await SubCategory.find(filterObj)
    
res.json({message:"success", subcategories})
})

const getSubCategory = getOne(SubCategory)
const updateSubCategory = catchError(async (req ,res ,next)=>{
    req.body.slug = slugify(req.body.name)
    let subCategory = await SubCategory.findByIdAndUpdate(req.params.id,req.body,{new:true})
    
    subCategory ||  next(new appError("SubCategory not found",404))
    !subCategory || res.json({message:"success", subCategory})
})

const deleteSubCategory = deleteOne(SubCategory)




export{
    addSubCategory,
    getAllSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
}