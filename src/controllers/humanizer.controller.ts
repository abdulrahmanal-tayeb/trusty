import { Request, Response } from "express";
import { processText } from "../services/ai.service";

export const humanizeText = async (req: Request, res: Response) => {
    if(!req.body || !req.body.text){
        res.status(400).json("Hello");
        return;
    }

    const text = req.body.text;
    if(!text || text === "" || typeof(text) !== "string"){
        res.status(400).json({"error": "Invalid Text to Be Humanized."});
        return;
    }
    
    const steps = await processText(text);
    res.status(200).json(steps);
    return;
}