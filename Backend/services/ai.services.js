import {
    GoogleGenerativeAI
} from "@google/generative-ai";


const genAI =
    new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
    );


export const analyzeHealthWithAI =
    async (user, metrics) => {

        const model =
            genAI.getGenerativeModel({
                model:
                    "gemini-1.5-flash"
            });


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

Return ONLY valid JSON in this format:

{
  "status": "",
  "strengths": [],
  "risks": [],
  "suggestions": []
}
`;


        const result =
            await model.generateContent(
                prompt
            );

        const response =
            result.response.text();

        return JSON.parse(
            response
        );

    };