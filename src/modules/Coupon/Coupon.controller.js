
import { appError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne, getAll, getOne } from "../handlers/handlers.js"
import { Coupon } from "../../../Database/model/coupon.model.js"

const addCoupon = catchError(async (req ,res ,next)=>{
    let isExist = await Coupon.findOne({code: req.body.code})
    if(isExist) return next(new appError('coupon exists',409))
    let coupon = new Coupon(req.body)
    await coupon.save()
res.json({message:"success", coupon})
})

const getAllCoupons = getAll(Coupon)

const getCoupon = getOne(Coupon)
const updateCoupon = catchError(async (req ,res ,next)=>{
    let coupon = await Coupon.findByIdAndUpdate(req.params.id,req.body,{new:true})
    
    coupon ||  next(new appError("brand not found",404))
    !coupon || res.json({message:"success", coupon})
})

const deleteCoupon = deleteOne(Coupon)




export{
    addCoupon,
    getAllCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon
}