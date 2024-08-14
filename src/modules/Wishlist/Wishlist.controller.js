
import { appError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { User } from "../../../Database/model/user.model.js"





const addToWishlist = catchError(async (req ,res ,next)=>{
 

    let wishlist = await User.findByIdAndUpdate(req.user._id,{$addToSet:{wishlist:req.body.product}},{new:true})
    
    wishlist ||  next(new appError("wishlist not found",404))
    !wishlist || res.json({message:"success", wishlist:wishlist.wishlist})
})

const removeFromWishlist = catchError(async (req ,res ,next)=>{
 

    let wishlist = await User.findByIdAndUpdate(req.user._id,{$pull:{wishlist:req.params.id}},{new:true})
    
    wishlist ||  next(new appError("wishlist not found",404))
    !wishlist || res.json({message:"success", wishlist:wishlist.wishlist})
})

const getLoggedUserWishlist = catchError(async (req ,res ,next)=>{
 

    let wishlist = await User.findById(req.user._id).populate('wishlist')
    
    wishlist ||  next(new appError("wishlist not found",404))
    !wishlist || res.json({message:"success", wishlist:wishlist.wishlist})
})






export{
    addToWishlist,
    removeFromWishlist,
    getLoggedUserWishlist
}