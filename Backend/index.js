import express from 'express';
import cors from "cors";
import 'dotenv/config';
import connectDb from './config/db.js';
import foodRouter from './routes/food.js';
import router from './routes/auth.js';
import healthRouter from './routes/health.js';
import mealRouter from './routes/meal.js';
//Creating express server
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true
  })
);
//connect to Db function
connectDb();

//Auth Routes (login, signup, profile);
app.use('/auth', router);
//FoodLog routes(add, delete, edit, get);
app.use('/food', foodRouter);

//Health routes
app.use('/userHealth', healthRouter);

//Meal Route
app.use('/meals', mealRouter);

//Server working on 3000 port
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});