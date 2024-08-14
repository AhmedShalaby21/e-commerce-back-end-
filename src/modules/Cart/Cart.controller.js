import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { Cart } from "../../../Database/model/cart.model.js"
import { Product } from "../../../Database/model/product.model.js"
import { appError } from "../../utils/appError.js"
import { Coupon } from "../../../Database/model/coupon.model.js"

function calcTotalCartPrice(isCartExist){
  isCartExist.totalCartPrice = isCartExist.cartItems.reduce((prev , item)=> prev+= item.quantity * item.price , 0)
  if(isCartExist.discount){
    isCartExist.totalCartPriceAfterDiscount = isCartExist.totalCartPrice - (isCartExist.totalCartPrice * isCartExist.discount) / 100
    isCartExist.discount = isCartExist.discount
  }
 
}
const addToCart = catchError(async (req ,res ,next)=>{
  let isCartExist = await Cart.findOne({user:req.user._id})

  let product = await Product.findById(req.body.product)
  if(!product) return next(new appError("product not found" , 404))
    req.body.price = product.price
  if(req.body.quantity > product.stock) return next(new appError("Sold Out", 404))
  if(!isCartExist){
    let cart = new Cart({
        user: req.user._id,
        cartItems:[req.body]
    })
    calcTotalCartPrice(cart)
    await cart.save()
    res.json({message:"success",cart})
  }else{
    let item = isCartExist.cartItems.find(item=>item.product == req.body.product)
    if(item) {
      item.quantity += req.body.quantity || 1
      

      if(item.quantity > product.stock) return next(new appError("Sold Out", 404))
    }
    if(!item) isCartExist.cartItems.push(req.body)
      calcTotalCartPrice(isCartExist)
      await isCartExist.save()
    res.json({message:"success", cart: isCartExist})
  }

})

const updateCartQuantity = catchError(async(req,res,next)=>{
  let cart = await Cart.findOne({user:req.user._id,})
    let item  = cart.cartItems.find(item=> item.product == req.params.id)
  if(!item) return next(new appError("product not found",404))

    item.quantity = req.body.quantity
    calcTotalCartPrice(cart)
    await cart.save()
    res.json({messsage:"success",cart})
})

const removeCartItem = catchError(async (req ,res ,next)=>{
  let cart = await Cart.findOneAndUpdate({user:req.user._id},{$pull:{cartItems:{_id:req.params.id}}},{new:true})
  calcTotalCartPrice(cart)
  await cart.save()
  cart ||  next(new appError("cart not found",404))
  !cart || res.json({message:"success", cart})
})

const getLoggedUserCart = catchError(async (req ,res ,next)=>{
  let cart = await Cart.findOne({user:req.user._id})

  cart ||  next(new appError("cart not found",404))
  !cart || res.json({message:"success", cart})
})

const clearUserCart = catchError(async (req ,res ,next)=>{
  let cart = await Cart.findOneAndDelete({user:req.user._id})

  cart ||  next(new appError("cart not found",404))
  !cart || res.json({message:"success", cart})
})

const applyCoupon = catchError(async (req ,res ,next)=>{
  let coupon = await Coupon.findOne({code:req.body.code , expires:{$gte: Date.now()}})

  if(!coupon) return next(new appError("oops, coupon invalid",404))
    let cart = await Cart.findOne({user:req.user._id})
 
    await cart.save()
   res.json({message:"success", cart})
})




export { 
    addToCart,
    updateCartQuantity,
    removeCartItem,
    getLoggedUserCart,
    clearUserCart,
    applyCoupon
}
