
import { appError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { User } from "../../../Database/model/user.model.js"





const addAddress = catchError(async (req ,res ,next)=>{
 

    let address = await User.findByIdAndUpdate(req.user._id,{$push:{addresses:req.body}},{new:true})
    
    address ||  next(new appError("address not found",404))
    !address || res.json({message:"success", address:address.addresses})
})

const removeAddress = catchError(async (req ,res ,next)=>{
 

    let address = await User.findByIdAndUpdate(req.user._id,{$pull:{addresses:{_id:req.params.id}}},{new:true})
    
    address ||  next(new appError("address not found",404))
    !address || res.json({message:"success", address:address.addresses})
})

const getLoggedUserAddress = catchError(async (req ,res ,next)=>{
 

    let address = await User.findById(req.user._id)
    
    address ||  next(new appError("wishlist not found",404))
    !address || res.json({message:"success", address:address.addresses})
})






export{
    addAddress,
    removeAddress,
    getLoggedUserAddress
}