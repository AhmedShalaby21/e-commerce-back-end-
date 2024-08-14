import { Router } from "express";
import { addToWishlist, getLoggedUserWishlist, removeFromWishlist } from "./Wishlist.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";





const wishlistRouter = Router()

wishlistRouter
.route('/')
.patch(protectedRoutes,allowedTo('user'),addToWishlist)
.get(protectedRoutes,allowedTo('user'),getLoggedUserWishlist)

wishlistRouter
.route('/:id')
.delete(protectedRoutes,allowedTo('user','admin'),removeFromWishlist)


export default wishlistRouter