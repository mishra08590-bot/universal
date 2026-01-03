import { GoogleGenAI, Type } from "@google/genai";
import { Platform, HybridStrategyResponse } from "../types";

/**
 * Fetches real-world eCPM and market trend data to populate the dashboard.
 */
export const fetchMarketPulse = async (): Promise<{
  avgEcpm: number;
  marketTrend: string;
  fillRate: number;
  topGeos: string[];
}> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Act as a programmatic ad expert. Provide current global average eCPM for mobile/web ads, a 1-sentence market trend, an average fill rate percentage, and the top 3 high-revenue countries today. Return as JSON.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          avgEcpm: { type: Type.NUMBER },
          marketTrend: { type: Type.STRING },
          fillRate: { type: Type.NUMBER },
          topGeos: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["avgEcpm", "marketTrend", "fillRate", "topGeos"],
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

/**
 * Generates a hybrid monetization strategy using Google Gemini.
 */
export const generateHybridStrategy = async (
  gameName: string,
  genre: string,
  platform: Platform
): Promise<HybridStrategyResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Act as a Global Monetization Architect. Create an 'Everywhere' (Universal) strategy for "${gameName}" (${genre}) on ${platform}.
    The strategy must cover:
    1. Unity Ads (In-game engagement)
    2. Propeller Ads (Aggressive web yield/Popunders)
    3. Meta (Social media growth/FB/IG)
    4. Google AdMob/AdSense (Global standard app/web reach)

    Suggest specific placements that ensure the user can show ads on ANY app or website globally.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overview: { type: Type.STRING },
          channelBreakdown: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                provider: { type: Type.STRING },
                priority: { type: Type.STRING },
                placements: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      trigger: { type: Type.STRING },
                      optimizationTip: { type: Type.STRING },
                    },
                    required: ["name", "trigger", "optimizationTip"],
                  }
                }
              },
              required: ["provider", "priority", "placements"],
            },
          },
          globalReachPlan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                phase: { type: Type.STRING },
                action: { type: Type.STRING },
                target: { type: Type.STRING },
              },
              required: ["phase", "action", "target"],
            }
          },
          monetizationTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ["overview", "channelBreakdown", "globalReachPlan", "monetizationTips"],
      },
    },
  });

  return JSON.parse(response.text || '{}') as HybridStrategyResponse;
};

/**
 * Provides expert support response using Gemini Chat.
 */
export const getAiSupportResponse = async (userMessage: string, history: any[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: "You are the 'AdsPro Studio Expert'. You help users solve technical problems with Unity Ads, Google AdMob, Meta, and PropellerAds. Give concise, technical, and high-revenue advice in Hinglish (Hindi + English). If the user asks for code, provide C# for Unity or JavaScript for Web.",
    },
    history: history,
  });
  
  const response = await chat.sendMessage({ message: userMessage });
  return response.text || "Sorry, I am facing a connection issue.";
};