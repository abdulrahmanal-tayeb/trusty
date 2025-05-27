import OpenAI from "openai";
import { BaseAI } from "./base-ai";
import { AIRequestOptions } from "./types/base-ai";

const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_APIKEY! });

export const openai = new BaseAI(process.env.OPENAI_APIKEY!, {
    model: "gpt-4o",
    sendFn: (payload: AIRequestOptions) =>
        openaiClient.chat.completions.create({
            model: payload.model!,
            messages: [
                { role: "system", content: payload.system },
                { role: "user", content: payload.prompt }
            ],
            temperature: payload.temperature,
            max_tokens: payload.maxTokens,
        }),
});