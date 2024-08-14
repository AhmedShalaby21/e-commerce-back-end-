import { User } from "../../../Database/model/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import bcrypt from "bcrypt"
import { appError } from "../../utils/appError.js";
import jwt from "jsonwebtoken"

const signup = catchError(async(req,res)=>{
    let user = new User(req.body)
    await user.save()
    let token = jwt.sign({userId:user._id, role: user.role},process.env.JWT_KEY)
    res.json({message : "success",token})
})


const signin = catchError(async(req,res,next)=>{
    let user = await User.findOne({email:req.body.email})
    if(user&& bcrypt.compareSync(req.body.password, user.password)){
    let token = jwt.sign({userId:user._id, role: user.role},process.env.JWT_KEY)
        return res.json({message:"success",token})
    }
    next(new appError('incorrect email or passsword', 401))

})

const cahngeUserPassword = catchError(async(req,res,next)=>{
    let user = await User.findOne({email:req.body.email})
    if(user&& bcrypt.compareSync(req.body.oldPassword, user.password)){
        await User.findOneAndUpdate({email:req.body.email},{password:req.body.newPassword,passwordChangedAt:Date.now()})
    let token = jwt.sign({userId:user._id, role: user.role},process.env.JWT_KEY)
        return res.json({message:"success",token})
    }
    next(new appError('incorrect email or passsword', 401))

})

const protectedRoutes = catchError(async(req,res,next)=>{
 // 1- check token? exist or not
 let {token} = req.headers
 let userPayload = null 
 if(!token) return next(new appError("token not provided",401))
    // 2- verify token 
jwt.verify(token,'ahmed',(err, payload)=>{
    if(err) return next(new appError(err,401))
        userPayload = payload
})
// 3- check userId
let user = await User.findById(userPayload.userId)
if(!user) return next(new appError("user not found",401))
    if(user.passwordChangedAt){
        let time = parseInt(user.passwordChangedAt.getTime() / 1000)
        if(time>userPayload.iat) return next(new appError('invalid token ...login again',401))
    }
   
    req.user = user 
next()


})

const allowedTo = (...roles)=>{
    return catchError(async (req,res,next)=>{
        if (roles.includes(req.user.role))
            return next()
            return next(new appError('you are not authorized to access this endpoint',401))

    })
}
   



export{
    signup,
    signin,
    cahngeUserPassword,
    protectedRoutes,
    allowedTo
}