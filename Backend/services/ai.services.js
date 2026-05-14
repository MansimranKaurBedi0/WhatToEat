import {
    GoogleGenAI
} from "@google/genai";


const ai =
    new GoogleGenAI({
        apiKey:
            process.env.GEMINI_API_KEY
    });


export const analyzeHealthWithAI =
    async (user, metrics) => {

        const prompt = `
You are an expert nutrition coach.

Analyze this user:

Gender: ${user.gender}
Weight: ${user.weight}
Goal: ${user.goal}

Health metrics:

Health Score: ${metrics.healthScore}
Protein Score: ${metrics.proteinScore}
Junk Score: ${metrics.junkScore}
Sugar Score: ${metrics.sugarScore}
Consistency Score: ${metrics.consistencyScore}

Return ONLY valid JSON:

{
  "status": "",
  "strengths": [],
  "risks": [],
  "suggestions": []
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
            "Gemini Response:",
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