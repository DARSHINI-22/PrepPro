
import { GoogleGenAI, Type, Modality } from "@google/genai";

// Initialize Gemini AI with API key from environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using gemini-3-pro-preview for complex reasoning tasks
export const evaluateSpeaking = async (transcript: string, target: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [{ parts: [{ text: `Analyze the user's spoken transcript for accuracy, grammar, and fluency compared to the target phrase.
      Target: "${target}"
      Transcript: "${transcript}"` }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          feedback: { type: Type.STRING },
          improvements: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["score", "feedback", "improvements"]
      }
    }
  });
  // Use trim() on text output before parsing as JSON
  const jsonStr = response.text?.trim() || '{}';
  return JSON.parse(jsonStr);
};

export const evaluateWriting = async (prompt: string, answer: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [{ parts: [{ text: `Evaluate this writing task. Prompt: "${prompt}". User Answer: "${answer}"` }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          grammarFeedback: { type: Type.STRING },
          coherenceFeedback: { type: Type.STRING },
          vocabRating: { type: Type.NUMBER },
          sampleAnswer: { type: Type.STRING }
        },
        required: ["score", "grammarFeedback", "coherenceFeedback", "vocabRating", "sampleAnswer"]
      }
    }
  });
  // Use trim() on text output before parsing as JSON
  const jsonStr = response.text?.trim() || '{}';
  return JSON.parse(jsonStr);
};

export const startAIInterview = async (history: { role: string, text: string }[]) => {
  const contents = history.map(h => ({
    role: h.role === 'ai' ? 'model' : 'user',
    parts: [{ text: h.text }]
  }));
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: contents,
    config: {
      systemInstruction: "You are a professional HR and Technical Interviewer. Ask one specific question at a time. Provide feedback only when the interview ends."
    }
  });
  return response.text;
};

export const getInterviewFeedback = async (history: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [{ parts: [{ text: `Analyze this interview transcript: ${history}` }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          tips: { type: Type.ARRAY, items: { type: Type.STRING } },
          technicalRating: { type: Type.NUMBER },
          communicationRating: { type: Type.NUMBER },
          improvementPlan: { type: Type.STRING }
        },
        required: ["strengths", "weaknesses", "tips", "technicalRating", "communicationRating", "improvementPlan"]
      }
    }
  });
  // Use trim() on text output before parsing as JSON
  const jsonStr = response.text?.trim() || '{}';
  return JSON.parse(jsonStr);
};

// Helper for decoding base64 audio string to bytes as per guidelines
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper for decoding raw PCM data into AudioBuffer as per guidelines
async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// Text-to-Speech Implementation using Gemini 2.5 Flash TTS
export const playTTS = async (text: string, voiceName: string = 'Kore') => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say clearly: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      // AudioBytes returned is raw PCM 24000Hz mono
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const bytes = decode(base64Audio);
      const audioBuffer = await decodeAudioData(bytes, audioContext, 24000, 1);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
    }
  } catch (error) {
    console.error("TTS Error:", error);
  }
};
