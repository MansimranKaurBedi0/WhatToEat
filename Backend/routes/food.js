import { addFoodLog, getFoodLogs, editFoodLog, deleteFoodLog } from "../controller/food.controller.js";
import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

//AddFoodLog
router.post("/addFoodLog", authMiddleware, addFoodLog);

//GetFoodLogs
router.get("/getFoodLogs", authMiddleware, getFoodLogs);

//EditFoodLog
router.put("/editFoodLog/:foodId", authMiddleware, editFoodLog);

//DeleteFoodLog
router.delete("/deleteFoodLog/:foodId", authMiddleware, deleteFoodLog);

export default router;