import express from "express";
import { dbConn } from "./Database/dbConnection.js";
import { bootstrap } from "./src/modules/bootstrap.js";
import { globalErrorHandling } from "./src/middleware/globalErrorHandling.js";
import { appError } from "./src/utils/appError.js";
import cors from 'cors'
// import dotenv from "dotenv"
// dotenv.config()
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use('/uploads',express.static('uploads'))

bootstrap(app);

app.use('*',(req,res,next)=>{
   
    next(new appError(`route not found ${req.originalUrl}`,404))
})
app.use(globalErrorHandling)

app.listen(port, () => console.log(`e-commerce app listening on port ${port}`));
