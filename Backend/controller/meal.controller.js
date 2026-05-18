import User from "../models/Users.js";
import FoodLog from "../models/FoodLog.js";

import {
    calculateHealthMetrics
} from "../services/health.js";

import {
    analyzeHealthWithAI
} from "../services/ai.services.js";

import {
    getRandomMealSuggestions
} from "../services/randomRecommendation.service.js";

import {
    getRecipeFromIngredients
} from "../services/Recipe.service.js";
//Food Recommendation Controller
export const recommendMeals =
    async (req, res) => {

        try {

            const userId =
                req.user.id;


            // user fetch
            const user =
                await User.findById(userId);

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }


            // food logs fetch
            const foodLogs =
                await FoodLog.find({
                    userId
                });


            if (foodLogs.length === 0) {
                return res.status(400).json({
                    message:
                        "No food history found. Track food first."
                });
            }


            // metrics generate
            const metrics =
                calculateHealthMetrics(
                    foodLogs, user
                );


            // AI health insights
            const healthInsights =
                await analyzeHealthWithAI(
                    user,
                    metrics
                );


            // AI meal recommendation
            const meals =
                await getRandomMealSuggestions(
                    user,
                    metrics,
                    healthInsights
                );


            return res.status(200).json({
                success: true,
                meals
            });

        }

        catch (error) {

            console.log(
                "========== MEAL API ERROR =========="
            );

            console.log(
                "Error Message:",
                error.message
            );

            console.log(
                "Full Error:",
                error
            );

            console.log(
                "Stack Trace:",
                error.stack
            );

            return res.status(500).json({
                success: false,
                actualError:
                    error.message,
                fullError:
                    error.toString()
            });

        }

    };

//Recipe 
export const generateRecipe =
    async (req, res) => {

        try {

            const userId =
                req.user.id;

            const {
                ingredients
            } = req.body;


            if (
                !ingredients ||
                !Array.isArray(
                    ingredients
                ) ||
                ingredients.length === 0
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Ingredients are required"
                });

            }


            // user fetch
            const user =
                await User.findById(
                    userId
                );

            if (!user) {

                return res.status(404).json({
                    message:
                        "User not found"
                });

            }


            // food logs fetch
            const foodLogs =
                await FoodLog.find({
                    userId
                });


            // metrics
            const metrics =
                calculateHealthMetrics(
                    foodLogs,
                    user
                );


            // AI health insights
            const healthInsights =
                await analyzeHealthWithAI(
                    user,
                    metrics
                );


            // AI recipe
            const recipe =
                await getRecipeFromIngredients(
                    user,
                    metrics,
                    healthInsights,
                    ingredients
                );


            return res.status(200).json({
                success: true,
                recipe
            });

        }

        catch (error) {

            console.log(
                "Recipe Error:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    error.message
            });

        }

    };
