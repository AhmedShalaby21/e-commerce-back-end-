import { Router } from "express";
import { addReview, deleteReview, getAllReviews, getReview, updateReview } from "./Review.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";




const reviewRouter = Router()

reviewRouter
.route('/')
.post(protectedRoutes,allowedTo('user'),addReview)
.get(getAllReviews)
reviewRouter
.route('/:id')
.get(getReview)
.put(protectedRoutes,allowedTo('user'),updateReview)
.delete(protectedRoutes,allowedTo('user','admin'),deleteReview)
export default reviewRouter