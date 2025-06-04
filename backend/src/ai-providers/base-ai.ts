import { AIRequestOptions, AIResponse } from "../models/ai.model";

export const BASE_SYSTEM_INSTRUCTION = 'Your only task is to identify and replace AI-generated patterns in texts, making them sound more natural and human-like.';

type SendFn = (payload: any) => Promise<any>;
type ParseFn = (raw: any) => AIResponse;

export class BaseAI {
  protected key: string;
  protected model: string;
  protected temperature: number;
  protected maxTokens: number;

  protected sendFn?: SendFn;
  protected parseFn?: ParseFn;

  constructor(
    apiKey: string,
    config: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
      sendFn?: SendFn;
      parseFn?: ParseFn;
    } = {}
  ) {
    this.key = apiKey;
    this.model = config.model || "default-model";
    this.temperature = config.temperature ?? 0.7;
    this.maxTokens = config.maxTokens ?? 500;
    this.sendFn = config.sendFn;
    this.parseFn = config.parseFn;
  }

  public async send(options: AIRequestOptions): Promise<AIResponse> {
    console.log("SENDING>>>> ", options);
    const payload = this.buildRequestPayload(options);
    console.log("PAYLOD: ", payload);
    const raw = await this.sendRequest(payload);
    return this.parseResponse(raw);
  }

  protected buildRequestPayload(options: AIRequestOptions): any {
    return {
      temperature: options.temperature ?? this.temperature,
      ...options,
    };
  }

  protected async sendRequest(payload: any): Promise<any> {
    if (!this.sendFn) {
      throw new Error("sendFn not implemented or passed in constructor.");
    }
    return this.sendFn(payload);
  }

  protected parseResponse(raw: any): AIResponse {
    console.log("PARSING RESPONSE: ", raw);
    if (this.parseFn) return this.parseFn(raw);
  
    let json: any;
  
    try {
      const rawContent = typeof raw === "string"
        ? raw
        : typeof raw?.choices?.[0]?.message?.content === "string"
          ? raw.choices[0].message.content
          : JSON.stringify(raw);
  
      json = JSON.parse(rawContent);
    } catch (e) {
      return {
        result: "",
        changes: [],
        raw,
        humanized_score: 50
      };
    }
  
    return {
      result: typeof json.text === "string" ? json.text : "",
      changes: Array.isArray(json.changes) ? json.changes.slice(0, 3) : [],
      raw,
      humanized_score: json.humanized_score ?? 0
    };
  }
  
}
