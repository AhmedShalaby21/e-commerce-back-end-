export const globalErrorHandling = (err,req,res,next)=>{
    let code = err.statuscode || 500
    res.status(code).json({error:"error",message:err.message , code: code})
}