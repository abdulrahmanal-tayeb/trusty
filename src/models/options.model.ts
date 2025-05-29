export interface HumanizerOptions {
    language?: string;
    tone?: "professional" | "friendly" | "neutral" | "empathetic";
    resultType?: "summarized" | "detailed" | "rewritten";
}