import { HistoryItem } from "../models/history.model";

export const getUserHistoryItems = async () : Promise<HistoryItem[]> => {
    return [];
}

export const getUserHistoryItem = async () : Promise<HistoryItem> => {
    return {} as HistoryItem;
}

export const deleteUserHistoryItem = async () : Promise<boolean> => {
    return true;
}

export const paraphraseUserHistoryItem = async () : Promise<String> => {
    return "Paraphrased";
}