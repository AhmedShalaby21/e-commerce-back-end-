import { Router } from "express";
import { addSubCategory, deleteSubCategory, getAllSubCategories, getSubCategory, updateSubCategory } from "./subCategory.controller.js";
import { validate } from "../../middleware/validate.js";
import { subCategoryValidationSchema } from "./subCategory.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const SubCategoryRouter = Router({mergeParams:true})

SubCategoryRouter
.route('/')
.post(protectedRoutes,allowedTo('admin'),addSubCategory,validate(subCategoryValidationSchema))
.get(getAllSubCategories)
SubCategoryRouter
.route('/:id')
.get(getSubCategory)
.put(protectedRoutes,allowedTo('admin'),updateSubCategory)
.delete(protectedRoutes,allowedTo('admin' ),deleteSubCategory)
export default SubCategoryRouter