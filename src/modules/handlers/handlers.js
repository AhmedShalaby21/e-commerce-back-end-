import { model } from "mongoose"
import { catchError } from "../../middleware/catchError.js"

export const getAll=(model)=>{

    return catchError(async (req ,res ,next)=>{
    //  ============ pagination ==============  
        let pageNumber = req.query.page *1 || 1
        if(req.query.page<1) pageNumber = 1
        let limit = req.query.limit
        let skip = (parseInt(pageNumber)-1) *limit 
    //  =============== filter ====================    
        let filterObj = structuredClone(req.query)
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/(gt|gte|lt|lte)/g,(value)=>` $${value}`)
        filterObj = JSON.parse(filterObj)
        console.log(filterObj);
        let exludedFields = ['page','sort','fields', 'search']
        exludedFields.forEach(val=>{
            delete filterObj[val]
        })
        let mongooseQuery =  model.find(filterObj).skip(skip).limit(limit)
    //  ==================== sort =========================
    if(req.query.sort){
        let sortedBy = req.query.sort.split(',').join(' ')
        mongooseQuery = mongooseQuery.sort(sortedBy) 

    }
    //  ==================== selectedFields =========================
    if(req.query.fields){
        let selectedFields = req.query.fields.split(',').join(' ')
        mongooseQuery = mongooseQuery.select(selectedFields) 

    }
      //  ==================== search =========================
      if(req.query.search){
       
        mongooseQuery = mongooseQuery.find(
            {
            $or: [
            {title:{$regex: req.query.search, $options:'i'}},
            {description:{$regex: req.query.search, $options:'i'}},
            {name:{$regex: req.query.search, $options:'i'}},

            ]
        }
        ).populate('user') 

    }

        let product = await mongooseQuery
        
    res.json({message:"success",pageNumber, product})
    })
}
export const getOne=(model)=>{

return catchError(async (req ,res ,next)=>{
    
    let doc = await model.findById(req.params.id)
    
    doc ||  next(new appError("doc not found",404))
    !doc || res.json({message:"success", doc})
}
)
}
export const deleteOne=(model)=>{
return catchError(async (req ,res ,next)=>{
    
    let doc = await model.findByIdAndDelete(req.params.id)

    doc ||  next(new appError("doc not found",404))
    !doc || res.json({message:"success", doc})
}
)
}