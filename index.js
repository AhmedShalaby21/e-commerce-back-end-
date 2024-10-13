import express from "express";
import { dbConn } from "./Database/dbConnection.js";
import { bootstrap } from "./src/modules/bootstrap.js";
import { globalErrorHandling } from "./src/middleware/globalErrorHandling.js";
import { appError } from "./src/utils/appError.js";
import cors from 'cors'
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Png86DWF14Y8AhBNLxOoea31qUzsEMKzN4ryyUKELy04zaPKyxLZ7vMTbhbfy3wQQqrTIj5A3TCWeZk1UIR5XHW00MXw1f9N3');

// import dotenv from "dotenv"
// dotenv.config()
import 'dotenv/config'
import { catchError } from "./src/middleware/catchError.js";

const app = express();
const port = process.env.PORT || 3000;
app.post('/api/webhook', express.raw({type: 'application/json'}),catchError((req, res) => {
    const sig = req.headers['stripe-signature'].toString()
  
    let event = stripe.webhooks.constructEvent(req.body, sig, "whsec_s7Fg5fSVAFhpGq5W4N5ALkShXT8TR7n4");
    let checkout
  if(event.type=='checkout.session.completed'){
     checkout = event.data.object;
     
  }
  
    res.json({message:"success",checkout});
  }))
app.use(cors())
app.use(express.json());
app.use('/uploads',express.static('uploads'))

bootstrap(app);

app.use('*',(req,res,next)=>{
   
    next(new appError(`route not found ${req.originalUrl}`,404))
})
app.use(globalErrorHandling)

app.listen(port, () => console.log(`e-commerce app listening on port ${port}`));
