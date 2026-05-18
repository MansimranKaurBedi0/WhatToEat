import {
    GoogleGenAI
} from "@google/genai";


const ai =
    new GoogleGenAI({
        apiKey:
            process.env.GEMINI_API_KEY
    });

export const getRecipeFromIngredients =
    async (
        user,
        metrics,
        healthInsights,
        ingredients
    ) => {

        const prompt = `
You are a certified nutrition coach and recipe expert.

Strictly use:

1. User profile
2. Health metrics
3. Previous health analysis
4. Available ingredients

Do not assume extra ingredients.
Use ONLY the provided ingredients.
Recipe must be practical, realistic, and commonly cookable in a home kitchen.
Salt, water, and basic spices are allowed as standard cooking essentials.

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


AVAILABLE INGREDIENTS:

${ingredients.join(", ")}


Create:

1. Dish name
2. Step-by-step recipe
3. Health benefit


Return ONLY valid JSON:

{
  "dishName": "",
  "recipe": [],
  "benefit": ""
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
            "Recipe Recommendation:",
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