import FoodLog from "../models/FoodLog.js";

// Add Food Log
const addFoodLog = async (req, res) => {
    try {

        const {
            foodName,
            calories,
            protein,
            carbs,
            fats,
            sugar,
            mealType,
            category
        } = req.body;

        if (
            !foodName ||
            calories == null ||
            protein == null ||
            carbs == null ||
            fats == null ||
            sugar == null ||
            !mealType ||
            !category
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const userId = req.user._id;

        const foodLog = new FoodLog({
            userId,
            foodName,
            calories,
            protein,
            carbs,
            fats,
            sugar,
            mealType,
            category
        });

        await foodLog.save();

        return res.status(201).json({
            message: "Food log added successfully",
            foodLog
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        });

    }
};

export { addFoodLog };