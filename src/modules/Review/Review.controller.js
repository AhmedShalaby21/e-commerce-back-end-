
import { appError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne, getAll, getOne } from "../handlers/handlers.js"
import { Review } from "../../../Database/model/review.model.js"

const addReview = catchError(async (req ,res ,next)=>{
    req.body.user= req.user._id
    let isExist = await Review.findOne({user:req.user._id,product:req.body.product})
    if(isExist) return next(new appError("you created a review before",409))
    let review = new Review(req.body)
    await review.save()
res.json({message:"success", review})
})

const getAllReviews  = getAll(Review)

const getReview = getOne(Review)
const updateReview  = catchError(async (req ,res ,next)=>{ 

    let review = await Review .findByIdAndUpdate({_id: req.params.id,user: req.user._id},req.body,{new:true})
    
    review ||  next(new appError("review not found or u are not created review ",404))
    !review || res.json({message:"success", review})
})

const deleteReview  = deleteOne(Review )




export{
    addReview,
    getAllReviews,
    getReview,
    updateReview,
    deleteReview
}