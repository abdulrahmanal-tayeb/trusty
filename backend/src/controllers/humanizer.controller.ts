import { Request, Response } from "express";
import { processText } from "../services/ai.service";
import { HumanizerOptions } from "../models/options.model";

export const humanizeText = async (req: Request, res: Response) => {
    if(!req.body || !req.body.text){
        res.status(400).json("Hello");
        return;
    }

    
    const text = req.body.text;
    console.log("Input: ", text);
    const options = (req.body?.options) as HumanizerOptions;

    if(!text || text === "" || typeof(text) !== "string"){
        res.status(400).json({"error": "Invalid Text to Be Humanized."});
        return;
    }
    
    const steps = await processText(text, options);
    res.status(200).json(steps);
    return;
}