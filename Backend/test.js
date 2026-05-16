import 'dotenv/config'
import {
    getRandomMealSuggestions
} from "./services/randomRecommendation.service.js";


const fakeUser = {

    gender: "female",

    weight: 58,

    goal: "muscle gain",

    dietPreference:
        "vegetarian",

    allergies:
        "peanuts",

    activityLevel:
        "moderate"

};


const fakeMetrics = {

    healthScore: 46,

    proteinScore: 31,

    junkScore: 50,

    sugarScore: 100,

    consistencyScore: 14

};


const fakeHealthInsights = {

    status:
        "Needs Improvement",

    strengths: [
        "Good sugar control"
    ],

    risks: [
        "Low protein intake",
        "Poor meal consistency"
    ],

    suggestions: [
        "Increase daily protein intake",
        "Avoid processed food"
    ]

};


const testAI =
    async () => {

        try {

            const result =
                await getRandomMealSuggestions(

                    fakeUser,

                    fakeMetrics,

                    fakeHealthInsights

                );


            console.log(
                "Final Recommendation:"
            );

            console.log(
                result
            );

        }
        catch (error) {

            console.log(
                "Test Error:",
                error
            );

        }

    };


testAI();