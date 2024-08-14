
import { appError } from "../utils/appError.js"

export const validate= (schema)=>{
    return (req,res,next)=>{
        let{error} = schema.validate({image:req.file,...req.body,...req.params,...req.query},{abortEarly:false})
        if(!error){     
            next()
        }else{
            let errorMessage = error.details.map(err=>err.message)
           
            next(new appError(errorMessage,401))
    
        }
    }
}