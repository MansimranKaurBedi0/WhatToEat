import {
    GoogleGenAI
} from "@google/genai";


const ai =
    new GoogleGenAI({
        apiKey:
            process.env.GEMINI_API_KEY
    });


export const getRandomMealSuggestions =
    async (
        user,
        metrics,
        healthInsights
    ) => {

        const prompt = `
You are a certified nutrition coach.

Strictly recommend meals based ONLY on:

1. User profile
2. Health metrics
3. Previous health analysis

Do not assume anything.

USER PROFILE:

Gender: ${user.gender}
Weight: ${user.weight}
Goal: ${user.goal}
Diet Preference: ${user.dietPreference}
Allergies: ${user.allergies}
Activity Level: ${user.activityLevel}


HEALTH METRICS:

Health Score: ${metrics.healthScore}
Protein Score: ${metrics.proteinScore}
Junk Score: ${metrics.junkScore}
Sugar Score: ${metrics.sugarScore}
Consistency Score: ${metrics.consistencyScore}


PREVIOUS HEALTH ANALYSIS:

Status:
${healthInsights.status}

Strengths:
${healthInsights.strengths.join(", ")}

Risks:
${healthInsights.risks.join(", ")}

Suggestions:
${healthInsights.suggestions.join(", ")}


Now recommend:

1. Breakfast
2. Lunch
3. Dinner
4. Healthy Snack

Return ONLY valid JSON:

{
  "breakfast": "",
  "lunch": "",
  "dinner": "",
  "snack": "",
  "reason": ""
}
`;


        const response =
            await ai.models.generateContent({
                model:
                    "gemini-3-flash-preview",
                contents:
                    prompt
            });


        const rawResponse =
            response.text;


        console.log(
            "Meal Recommendation:",
            rawResponse
        );


        const cleanedResponse =
            rawResponse
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();


        return JSON.parse(
            cleanedResponse
        );

    };