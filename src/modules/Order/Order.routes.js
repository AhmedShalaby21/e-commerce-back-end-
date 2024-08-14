import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { createCashOrder, createCheckoutSession, getAllOrders, getUserOrders } from "./Order.controller.js";




const orderRouter = Router()

 orderRouter
 .route('/')
 .get(protectedRoutes,allowedTo('admin'),getAllOrders)
 orderRouter.get("/user",protectedRoutes,allowedTo('user','admin'),getUserOrders)



 orderRouter
.route('/:id')
 .post(protectedRoutes,allowedTo('user'),createCashOrder)
 
 orderRouter.post("/checkout/:id", protectedRoutes,allowedTo('user'), createCheckoutSession)

export default orderRouter