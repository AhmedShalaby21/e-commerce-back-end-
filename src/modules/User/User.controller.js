
import { appError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne, getAll, getOne } from "../handlers/handlers.js"
import { User } from "../../../Database/model/user.model.js"

const addUser = catchError(async (req ,res ,next)=>{
    let user = new User (req.body)
    await user.save()
res.json({message:"success", user})
})

const getAllUsers = getAll(User)

const getUser  = getOne(User)
const updateUser  = catchError(async (req ,res ,next)=>{
    let user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    
    user ||  next(new appError("user not found",404))
    !user || res.json({message:"success", user})
})

const deleteUser  = deleteOne(User)




export{
    addUser ,
    getAllUsers ,
    getUser ,
    updateUser ,
    deleteUser 
}