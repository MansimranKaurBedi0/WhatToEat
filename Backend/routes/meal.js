import express from "express";

import {
    recommendMeals,
    generateRecipe
} from "../controller/meal.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";


const router =
    express.Router();


router.get(
    "/random",
    authMiddleware,
    recommendMeals
);

router.post(
    "/recipe",
    authMiddleware,
    generateRecipe
);

export default router;