import { Router } from "express";
import { addBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from "./Brand.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { brandValidationSchema } from "./Brand.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";



const brandRouter = Router()

brandRouter
.route('/')
.post(protectedRoutes,allowedTo('admin'),uploadSingleFile('logo','brands'),validate(brandValidationSchema),addBrand)
.get(getAllBrands)
brandRouter
.route('/:id')
.get(getBrand)
.put(protectedRoutes,allowedTo('admin'),uploadSingleFile('logo','brands'),updateBrand)
.delete(protectedRoutes,allowedTo('admin'),deleteBrand)
export default brandRouter