import {
    GoogleGenAI
} from "@google/genai";


const ai =
    new GoogleGenAI({
        apiKey:
            process.env.GEMINI_API_KEY
    });


export const getRandomMealSuggestions =
    async (user, metrics) => {

        const prompt = `
You are an expert nutrition coach.

Recommend meals based ONLY on this user profile.

User Profile:

Gender: ${user.gender}
Weight: ${user.weight}
Goal: ${user.goal}
Diet Preference: ${user.dietPreference}
Allergies: ${user.allergies}

Health Metrics:

Health Score: ${metrics.healthScore}
Protein Score: ${metrics.proteinScore}
Sugar Score: ${metrics.sugarScore}
Junk Score: ${metrics.junkScore}

Suggest:

1. Breakfast
2. Lunch
3. Dinner
4. Healthy Snack

Return ONLY JSON:

{
  "breakfast": "",
  "lunch": "",
  "dinner": "",
  "snack": ""
}
`;

        const response =
            await ai.models.generateContent({
                model:
                    "gemini-3-flash-preview",
                contents:
                    prompt
            });

        return JSON.parse(
            response.text
        );

    };