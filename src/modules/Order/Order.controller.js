import { catchError } from "../../middleware/catchError.js"
import { Cart } from "../../../Database/model/cart.model.js"
import { Product } from "../../../Database/model/product.model.js"
import { appError } from "../../utils/appError.js"
import { Order } from "../../../Database/model/order.model.js"
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Png86DWF14Y8AhBNLxOoea31qUzsEMKzN4ryyUKELy04zaPKyxLZ7vMTbhbfy3wQQqrTIj5A3TCWeZk1UIR5XHW00MXw1f9N3');


const createCashOrder = catchError(async (req ,res ,next)=>{
  // 1- get user cart by id 
  let cart = await Cart.findById(req.params.id)
  if(!cart) return next(new appError('cart not found',404))
  // 2- total order price
  let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice
  // 3- create order
  let order = new Order({
    user: req.user._id,
    orderItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice
    
  })
  await order.save()
  // 4- increment sold && decrement stock
  let options = cart.cartItems.map((prod)=>{
    return ({
      updateOne:{
        "filter":{_id:prod.product},
        "update":{$inc:{sold:prod.quantity,stock:-prod.quantity}}
      }
    })
  })
  await Product.bulkWrite(options)
  // 5- clear user cart
  await Cart.findByIdAndDelete(cart._id)
 res.json({message:"success",order})

})

const getUserOrders = catchError(async (req ,res ,next)=>{
  let orders = await Order.findOne({user:req.user._id}).populate('orderItems.product')
  
 res.json({message:"success",orders})

})

const getAllOrders = catchError(async (req ,res ,next)=>{
  let orders = await Order.find({})
  
 res.json({message:"success",orders})

})

const createCheckoutSession = catchError(async (req ,res ,next)=>{
  let cart = await Cart.findById(req.params.id)
  if(!cart) return next(new appError('cart not found',404))
  
  let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice

  let session = await stripe.checkout.sessions.create({
    line_items:[
      {
        price_data:{
          currency:'egp',
          unit_amount: totalOrderPrice * 100,
          product_data:{
            name:req.user.name
          }
        },
        quantity:1,
      },
    ],
    mode:'payment',
    success_url: "https://e-commerce-react-js-sigma.vercel.app/AllOrders",
    cancel_url: "https://e-commerce-react-js-sigma.vercel.app/cart",

    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: req.body.shippingAddress
  })

  res.json({message:"success", session})

})







export { 
  createCashOrder,
  getUserOrders,
  getAllOrders,
  createCheckoutSession
}



// ahmed
//5875421 