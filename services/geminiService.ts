
import { GoogleGenAI, Type } from "@google/genai";
import { Platform, HybridStrategyResponse, AdProvider } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateHybridStrategy = async (
  gameName: string,
  genre: string,
  platform: Platform
): Promise<HybridStrategyResponse> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Act as a Global Monetization Architect. Create an 'Everywhere' (Universal) strategy for "${gameName}" (${genre}) on ${platform}.
    The strategy must cover:
    1. Unity Ads (In-game engagement)
    2. Propeller Ads (Aggressive web yield/Popunders)
    3. Meta (Social media growth/FB/IG)
    4. Google AdMob/AdSense (Global standard app/web reach)
    5. AppLovin (Mediation for max fill rates)

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
