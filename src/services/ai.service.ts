import { openai } from "../ai-providers/openai-provider";
import { AIResponse, PhaseFunc, PhaseOutput } from "../models/ai.model";
import { PHASES_TEMPLATES } from "../config/constants";
import { HumanizerOptions } from "../models/options.model";

export const firstPhase = async (text: string, system: string): Promise<AIResponse> => {
    return openai.send({
        model: "gpt-4o",
        system,
        prompt: `Humanize this text:\n \`\`\`${text}\`\`\``,
    });
}

export const secondPhase = async (text: string, system: string): Promise<AIResponse> => {
    return openai.send({
        model: "gpt-4o",
        system,
        prompt: `Humanize this text:\n \`\`\`${text}\`\`\``,
    });
}


export const processText = async (userText: string, options: HumanizerOptions): Promise<PhaseOutput[]> => {
    if (!userText) return [];

    const steps: PhaseOutput[] = [];
    let currentText = userText;

    for (const [index, phase] of PHASES.entries()) {
        try {
            console.log(`Executing phase ${index + 1}...`)
            const {result, changes, raw, humanized_score} = await phase(
                currentText, 
                buildSystemInstruction(
                    PHASES_TEMPLATES[index], 
                    options
                )
            );
            currentText = result;
            console.log("RESULT: ", raw);
            console.log("SCORE: ", humanized_score);
            steps.push({result, changes, humanized_score: humanized_score ?? 0});
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


const buildSystemInstruction = (systemInstruction: string, options: HumanizerOptions) : string => {
return `
${systemInstruction}

# Notes:
${(options.language && options.language !== "english")? `- Return the results in ${options.language}` : ""}.
${(options.tone && `- Use a ${options.tone} tone`)}
${(options.resultType && `- Make sure to return a ${options.resultType}`)}
`;
}