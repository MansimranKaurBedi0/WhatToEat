import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import connectDb from './config/db.js';
import router from './routes/auth.js';
const app = express();
app.use(express.json());
connectDb();
app.use('/auth',router);
app.listen(3000,()=>{
  console.log("Server is running on port 3000");
});