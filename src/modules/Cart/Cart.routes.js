import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addToCart, applyCoupon, clearUserCart, getLoggedUserCart, removeCartItem, updateCartQuantity } from "./Cart.controller.js";



const cartRouter = Router()

cartRouter
.route('/')
.post(protectedRoutes,allowedTo('user'),addToCart)
.get(protectedRoutes,allowedTo('user'),getLoggedUserCart)
.delete(protectedRoutes,allowedTo('user'),clearUserCart)


 cartRouter
.route('/:id')
// .get(getBrand)
 .put(protectedRoutes,allowedTo('user'),updateCartQuantity)
.delete(protectedRoutes,allowedTo('user'),removeCartItem)
cartRouter
.post('/apply-coupon',protectedRoutes,allowedTo('user'),applyCoupon)
export default cartRouter