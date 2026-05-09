import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import connectDb from './config/db.js';
const app = express();
connectDb();
app.listen(3000,()=>{
  console.log("Server is running on port 3000");
});