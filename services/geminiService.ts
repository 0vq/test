
import { GoogleGenAI, Type } from "@google/genai";
import { SecurityAdvice } from "../types";

export const getSecurityAdvice = async (password: string): Promise<SecurityAdvice> => {
  try {
    // Correct initialization: always use {apiKey: process.env.API_KEY}
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Evaluate this password security and provide advice: "${password}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.INTEGER,
              description: "Security score from 0 to 100",
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of tips to improve security",
            }
          },
          required: ["score", "recommendations"]
        }
      }
    });

    // Access the .text property directly (not a method)
    const text = response.text;
    return JSON.parse(text || '{"score": 50, "recommendations": ["Unknown error parsing advice"]}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      score: 0,
      recommendations: ["Could not connect to AI advisor. Check your connection."]
    };
  }
};

export const suggestPassword = async (): Promise<string> => {
    try {
      // Correct initialization: always use {apiKey: process.env.API_KEY}
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Generate a very strong, unique, and memorable 16-character password using symbols, numbers, and case-mixing. Return ONLY the password string.",
      });
      // Access the .text property directly
      return response.text?.trim() || "KrYpt0-V4ult-2024!";
    } catch (error) {
        return "KrYpt0-V4ult-2024!";
    }
}
