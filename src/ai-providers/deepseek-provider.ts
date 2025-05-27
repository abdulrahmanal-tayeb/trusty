import OpenAI from "openai";
import { BaseAI } from "./base-ai";
import { AIRequestOptions } from "./types/base-ai";

const deepseekClient = new OpenAI({ apiKey: process.env.OPENAI_APIKEY!, baseURL: 'https://api.deepseek.com' });

export const deepseek = new BaseAI(process.env.DEEPSEEK_APIKEY!, {
    model: "deepseek-chat",
    sendFn: (payload: AIRequestOptions) =>
        deepseekClient.chat.completions.create({
            model: payload.model!,
            messages: [
                { role: "system", content: payload.system },
                { role: "user", content: payload.prompt }
            ],
            temperature: payload.temperature,
            max_tokens: payload.maxTokens,
        }),
});