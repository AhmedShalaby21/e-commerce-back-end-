import { Router } from "express";
import { addCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "./Category.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { addCategoryValidation } from "./Category.validation.js";
import SubCategoryRouter from "../subCategory/subCategory.routes.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const categoryRouter = Router()
categoryRouter.use('/:category/subcategories',SubCategoryRouter)
categoryRouter
.route('/')
.post(protectedRoutes,allowedTo('admin'),uploadSingleFile('image','categories'),validate(addCategoryValidation),addCategory)
.get(getAllCategories)
categoryRouter
.route('/:id')
.get(getCategory)
.put(protectedRoutes,allowedTo('admin'),uploadSingleFile('image','categories'),updateCategory)
.delete(protectedRoutes,allowedTo('admin'),deleteCategory)
export default categoryRouter