import OpenAI from "openai";
import { APIPromise } from "openai/core";
import { ChatCompletion } from "openai/resources/chat";

export type AIRequestOptions = {
    prompt: string;
    model: AIModels;
    temperature?: number;
    maxTokens?: number;
    system: string;
    messages?: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
    [key: string]: any; // for provider-specific options
};

export type AIResponse = {
    result: string;
    changes: string[];
    humanized_score?: number;
    raw?: ChatCompletion;
};

export type AIModels = "gpt-4o" | "deepseek-chat";

export type PhaseFunc = (text: string, system: string) => Promise<AIResponse>;

export type PhaseOutput = {
    result: string;
    changes: string[];
    humanized_score?: number;
};
