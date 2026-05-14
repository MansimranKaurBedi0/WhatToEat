import User from "../models/Users.js";
import FoodLog from "../models/FoodLog.js";

import {
    calculateHealthMetrics
} from "../services/health.js";


export const getHealthAnalysis =
    async (req, res) => {
        try {
            const userId = req.user.id;


            // 1. Get user profile
            const user =
                await User.findById(
                    userId
                );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message:
                        "User not found"
                });
            }


            // 2. Last 7 days filter
            const sevenDaysAgo =
                new Date();

            sevenDaysAgo.setDate(
                sevenDaysAgo.getDate() - 7
            );


            // 3. Get food logs
            const foodLogs =
                await FoodLog.find({
                    userId,
                    date: {
                        $gte:
                            sevenDaysAgo
                    }
                });


            // 4. Calculate metrics
            const metrics =
                calculateHealthMetrics(
                    foodLogs,
                    user
                );


            // 5. Return response
            return res.status(200).json({
                success: true,
                data: metrics
            });

        }
        catch (error) {

            console.log(
                "Health Analysis Error:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Internal server error"
            });

        }

    };