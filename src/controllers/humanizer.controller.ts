import { Request, Response } from "express";

export const humanizeText = async (req: Request, res: Response) => {
    const text = req.body.text;
    if(!text || text === "" || typeof(text) !== "string"){
        res.status(400).json({"error": "Invalid Text to Be Humanized."});
    }
    
    // const steps = processText(text);
    res.status(200).json([{"h": "hello"}, {"b": "bello"}]);
}