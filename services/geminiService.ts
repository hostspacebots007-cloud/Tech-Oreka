
import { GoogleGenAI, Type } from "@google/genai";
import { Product, AIRecommendation, GroundingSource } from "../types";

export const findProductsWithAI = async (query: string, products: Product[]): Promise<AIRecommendation> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Create a condensed inventory reference for the model
  const inventoryContext = products.map(p => ({
    id: p.id,
    name: p.name,
    price: p.sale_price || p.price,
    brand: p.brand,
    specs: p.short_desc
  })).slice(0, 100); // Focused slice for better token efficiency

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `User Query: "${query}"
    
    You are the OrekaTech Botswana Senior Tech Consultant. 
    1. Search for technical benchmarks or reviews relevant to the user's needs using Google Search.
    2. Review our current local inventory (provided below).
    3. Recommend the best 3-6 matching products. 
    4. Provide a "Consultant's Insight" explaining why these choices fit the user's budget and technical requirements.

    Inventory Context:
    ${JSON.stringify(inventoryContext)}
    
    Response must be valid JSON following this schema:
    {
      "productIds": ["string"],
      "reasoning": "string"
    }`,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          productIds: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "IDs of matching products from inventory"
          },
          reasoning: {
            type: Type.STRING,
            description: "Expert reasoning for the recommendation"
          }
        },
        required: ["productIds", "reasoning"]
      }
    }
  });

  const sources: GroundingSource[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.filter(chunk => chunk.web)
    ?.map(chunk => ({
      title: chunk.web.title,
      uri: chunk.web.uri
    })) || [];

  try {
    const data = JSON.parse(response.text || "{}");
    return {
      productIds: data.productIds || [],
      reasoning: data.reasoning || "I've analyzed our stock to find the best fit for your needs.",
      sources: sources
    };
  } catch (e) {
    console.error("AI Parse Error:", e);
    return { productIds: [], reasoning: "Our AI is currently optimizing inventory data. Please try again in a moment." };
  }
};
