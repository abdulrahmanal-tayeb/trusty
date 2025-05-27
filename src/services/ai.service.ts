import { deepseek } from "../ai-providers/deepseek-provider";
import { openai } from "../ai-providers/openai-provider";
import { AIResponse, PhaseFunc, PhaseOutput } from "../ai-providers/types/base-ai";

export const discoveryPhase = async (text: string): Promise<AIResponse> => {
    return openai.send({
        model: "gpt-4o",
        system: "",
        prompt: "",
    });
}

export const breakingPhase = async (): Promise<AIResponse> => {
    return deepseek.send({
        model: "deepseek-chat",
        system: "",
        prompt: "",
    });
}

export const replacingPhase = async (): Promise<AIResponse> => {
    return deepseek.send({
        model: "deepseek-chat",
        system: "",
        prompt: "",
    });
}

export const compundingPhase = async (): Promise<AIResponse> => {
    return deepseek.send({
        model: "deepseek-chat",
        system: "",
        prompt: "",
    });
}

export const evaluationPhase = async (): Promise<AIResponse> => {
    return deepseek.send({
        model: "deepseek-chat",
        system: "",
        prompt: "",
    });
}

const PHASES: PhaseFunc[] = [
    discoveryPhase,
    breakingPhase,
    replacingPhase,
    compundingPhase,
    evaluationPhase,
];

export const processText = async (userText: string): Promise<PhaseOutput[]> => {
    if (!userText) return [];

    const steps: PhaseOutput[] = [];
    let currentText = userText;

    for (const phase of PHASES) {
        try {
            steps.push(await phase(currentText));
        } catch(e) {
            continue;
        }
    }

    return steps;
};