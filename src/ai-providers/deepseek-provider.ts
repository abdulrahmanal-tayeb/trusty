import OpenAI from "openai";
import { BASE_SYSTEM_INSTRUCTION, BaseAI } from "./base-ai";
import { AIRequestOptions } from "../models/ai.model";
console.log(`API KEY: ${process.env.OPENAI_APIKEY}`);
const deepseekClient = new OpenAI({ apiKey: process.env.DEEPSEEK_APIKEY!, baseURL: 'https://api.deepseek.com' });
export const deepseek = new BaseAI(process.env.DEEPSEEK_APIKEY!, {
    model: "deepseek-chat",
    sendFn: (payload: AIRequestOptions) =>
        deepseekClient.chat.completions.create({
            model: payload.model!,
            messages: [
                { role: "system", content: `${BASE_SYSTEM_INSTRUCTION}\n${payload.system}`},
                { role: "user", content: payload.prompt }
            ],
            temperature: payload.temperature,
        }),
});