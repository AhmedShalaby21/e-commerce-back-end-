import { connect } from "mongoose";

export const dbConn = connect('mongodb+srv://ahmed:5875421@cluster0.tm0uq.mongodb.net/e-commerce')
  .then(() => console.log('Database connected'))
  
