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


// Get My Food Logs
const getFoodLogs = async (req, res) => {
    try {

        const userId = req.user._id;

        const foodLogs = await FoodLog.find({
            userId
        }).sort({ date: -1 });
        if (foodLogs.length === 0) {
            return res.status(200).json({
                message: "No food logs found",
                totalFoods: 0,
                foodLogs: []
            });
        }

        return res.status(200).json({
            message: "Food logs fetched successfully",
            totalFoods: foodLogs.length,
            foodLogs
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        });

    }
};

//Edit FoodLog
const editFoodLog = async (req, res) => {
    try {
        const foodId = req.params.foodId;
        const userId = req.user._id;
        const foodLog = await FoodLog.findByIdAndUpdate(
            {
                _id: foodId,
                userId: userId
            },
            req.body,
            { new: true }
        );

        if (!foodLog) {
            return res.status(404).json({ message: "Food log not found" });
        }

        return res.status(200).json({
            message: "Food log updated successfully",
            foodLog
        });

    }
    catch (err) {
        res.status(400).json({ message: "Error in editing" + err.message });
    }
}
export { addFoodLog, getFoodLogs, editFoodLog };
