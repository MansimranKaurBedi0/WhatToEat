import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import connectDb from './config/db.js';
import foodRouter from './routes/food.js';
import router from './routes/auth.js';

//Creating express server
const app = express();
app.use(express.json());

//connect to Db function
connectDb();

//Auth Routes (login, signup, profile);
app.use('/auth', router);
//FoodLog routes(add, delete, edit, get);
app.use('/food', foodRouter);

//Server working on 3000 port
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});