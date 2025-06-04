import OpenAI from "openai";
import { BASE_SYSTEM_INSTRUCTION, BaseAI } from "./base-ai";
import { AIRequestOptions } from "../models/ai.model";

const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_APIKEY! });

export const openai = new BaseAI(process.env.OPENAI_APIKEY!, {
    model: "gpt-4o",
    sendFn: (payload: AIRequestOptions) =>
        openaiClient.chat.completions.create({
            model: payload.model!,
            messages: [
                { role: "system", content: `${BASE_SYSTEM_INSTRUCTION}\n${payload.system}`},
                { role: "user", content: payload.prompt }
            ],
            temperature: payload.temperature,
        }),
});