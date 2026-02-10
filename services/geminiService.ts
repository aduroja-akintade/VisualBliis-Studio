
import { GoogleGenAI } from "@google/genai";
import { EditParams } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

export async function processImage(
  imageBase64: string,
  params: EditParams
): Promise<string> {
  const useMock = process.env.USE_MOCK === 'true' || process.env.NODE_ENV === 'development';

  if (useMock) {
    const { processImage: mockProcess } = await import('./geminiMock');
    return mockProcess(imageBase64, params);
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  // Format the request for gemini-2.5-flash-image
  const modelName = 'gemini-2.5-flash-image';
  
  const prompt = `
    ${SYSTEM_INSTRUCTION}
    
    TASK: Retouch the provided image with the following parameters:
    - Target Intent: ${params.intent}
    - Camera Angle: ${params.angle}
    - Framing: ${params.framing}
    - Lighting Setup: ${params.lighting}
    - Background Environment: ${params.background}
    - Retouching Detail Level: ${params.retouchingLevel}
    - Output Aspect Ratio: ${params.aspectRatio}

    CRITICAL: Ensure the subject's identity is 100% preserved. Do not alter facial structure. 
    Make the transition to the new background seamless, respecting fine details like hair and shadows.
  `;

  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: imageBase64.split(',')[1] || imageBase64,
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: [
          imagePart,
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: params.aspectRatio === '1:1' ? '1:1' : 
                       params.aspectRatio === '4:5' ? '3:4' : 
                       params.aspectRatio === '3:2' ? '4:3' : '16:9'
        }
      }
    });

    let resultImageUrl = '';
    
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          resultImageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!resultImageUrl) {
      throw new Error("No image data returned from the model.");
    }

    return resultImageUrl;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to process image.");
  }
}
