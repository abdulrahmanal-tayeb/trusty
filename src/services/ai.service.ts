import { deepseek } from "../ai-providers/deepseek-provider";
import { openai } from "../ai-providers/openai-provider";
import { AIResponse, PhaseFunc, PhaseOutput } from "../models/ai.model";
import { PHASES_TEMPLATES } from "../config/constants";

export const firstPhase = async (text: string, system: string): Promise<AIResponse> => {
    return openai.send({
        model: "gpt-4o",
        system,
        prompt: text,
    });
}

export const secondPhase = async (text: string, system: string): Promise<AIResponse> => {
    return deepseek.send({
        model: "deepseek-chat",
        system,
        prompt: text,
    });
}


export const processText = async (userText: string): Promise<PhaseOutput[]> => {
    if (!userText) return [];

    const steps: PhaseOutput[] = [];
    let currentText = userText;

    for (const [index, phase] of PHASES.entries()) {
        try {
            console.log(`Executing phase ${index + 1}...`)
            const {result, changes, raw} = await phase(currentText, PHASES_TEMPLATES[index]);
            currentText = result;
            console.log("RESULT: ", raw);
            steps.push({result, changes});
        } catch (e) {
            continue;
        }
    }

    console.log(`Result of all steps: ${steps}`);
    return steps;
};


const PHASES: PhaseFunc[] = [
    firstPhase,
    secondPhase,
];
