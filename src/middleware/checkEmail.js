
import { User } from "../../Database/model/user.model.js"
import { appError } from "../utils/appError.js"

export const checkEmail = async(req,res, next)=>{
let isUserExists = await User.findOne({email:req.body.email})
if(isUserExists) return next(new appError("email already exists",409))

next()
}