import slugify from "slugify"
import { Category } from "../../../Database/model/category.model.js"
import { appError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne, getAll, getOne } from "../handlers/handlers.js"


const addCategory = catchError(async (req ,res ,next)=>{
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    let category = new Category(req.body)
    await category.save()
res.json({message:"success", category})
})

const getAllCategories = getAll(Category)

const getCategory = getOne(Category)
const updateCategory = catchError(async (req ,res ,next)=>{
    if(req.body.slug ) req.body.slug = slugify(req.body.name)
   if(req.file) req.body.image = req.file.filename
    let category = await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
    
    category ||  next(new appError("category not found",404))
    !category || res.json({message:"success", category})
})
const deleteCategory = deleteOne(Category)




export{
    addCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
}