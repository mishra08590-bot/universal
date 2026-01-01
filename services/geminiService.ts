
import { GoogleGenAI, Type } from "@google/genai";
import { Platform, HybridStrategyResponse, AdProvider } from "../types";

// Helper to get the best available API key
const getApiKey = (): string => {
  const savedKeys = localStorage.getItem('adspro_keys');
  if (savedKeys) {
    const parsed = JSON.parse(savedKeys);
    if (parsed.google_ai) return parsed.google_ai;
  }
  return process.env.API_KEY || '';
};

export const generateHybridStrategy = async (
  gameName: string,
  genre: string,
  platform: Platform
): Promise<HybridStrategyResponse> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API_KEY_MISSING");

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
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

export const getAiSupportResponse = async (userMessage: string, history: {role: string, parts: any[]}[]): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API_KEY_MISSING");

  const ai = new GoogleGenAI({ apiKey });
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are the 'AdsPro Studio Expert'. You help users solve technical problems with Unity Ads, Google AdMob, Meta, and PropellerAds. Give concise, technical, and high-revenue advice in Hinglish (Hindi + English). If the user asks for code, provide C# for Unity or JavaScript for Web.",
    }
  });
  
  const response = await chat.sendMessage({ message: userMessage });
  return response.text || "Sorry, I am facing a connection issue.";
};
