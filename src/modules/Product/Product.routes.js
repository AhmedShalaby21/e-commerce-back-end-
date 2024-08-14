import { Router } from "express";
import { addProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from "./Product.controller.js";
import { uploadMixOfFiles } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { productValidationSchema } from "./Product.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";



const productRouter = Router()

productRouter
.route('/')
.post(protectedRoutes,allowedTo('admin'),uploadMixOfFiles([{name: 'imageCover', maxCount:1},{name: 'images', maxCount:10}],'product'),validate(productValidationSchema),addProduct)
.get(getAllProduct)
productRouter
.route('/:id')
.get(getProduct)
.put(protectedRoutes,allowedTo('admin'),uploadMixOfFiles([{name: 'imageCover', maxCount:1},{name: 'images', maxCount:10}],'product'),updateProduct)
.delete(protectedRoutes,allowedTo('admin'),deleteProduct)
export default productRouter