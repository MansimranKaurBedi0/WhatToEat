import express from "express";

import {
    recommendMeals
} from "../controller/meal.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";


const router =
    express.Router();


router.get(
    "/random",
    authMiddleware,
    recommendMeals
);


export default router;