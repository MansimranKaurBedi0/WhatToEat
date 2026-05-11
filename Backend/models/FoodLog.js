import mongoose from "mongoose";
const foodLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        foodName: {
            type: String,
            required: true,
            trim: true,
        },

        calories: {
            type: Number,
            required: true,
            min: 0,
        },

        protein: {
            type: Number,
            required: true,
            min: 0,
        },

        carbs: {
            type: Number,
            required: true,
            min: 0,
        },

        fats: {
            type: Number,
            required: true,
            min: 0,
        },

        sugar: {
            type: Number,
            default: 0,
            min: 0,
        },

        mealType: {
            type: String,
            enum: ["breakfast", "lunch", "dinner", "snacks"],
            required: true,
        },

        category: {
            type: String,
            enum: ["healthy", "junk", "beverage", "dessert", "protein-rich"],
            required: true,
        },

        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const FoodLog = mongoose.model("FoodLog", foodLogSchema);

export default FoodLog;