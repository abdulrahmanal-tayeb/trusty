import { AIRequestOptions, AIResponse } from "./types/base-ai";

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
    const payload = this.buildRequestPayload(options);
    const raw = await this.sendRequest(payload);
    return this.parseResponse(raw);
  }

  protected buildRequestPayload(options: AIRequestOptions): any {
    return {
      temperature: options.temperature ?? this.temperature,
      maxTokens: options.maxTokens ?? this.maxTokens,
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
      };
    }

    return {
      result: typeof json.result === "string" ? json.result : "",
      changes: Array.isArray(json.changes) ? json.changes.slice(0, 3) : [],
      raw,
    };
  }
}
