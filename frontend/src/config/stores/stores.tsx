// store/userInputStore.ts
import { create } from 'zustand';

export enum UserInputField {
    Text = 'text',
    Tone = 'tone',
    Language = 'language',
    ResultType = 'resultType',
}

interface UserInputState {
    text: string;
    tone: string;
    language: string;
    resultType: string;
    setValue: (field: UserInputField, newValue?: string) => void;
}


export const useUserInputStore = create<UserInputState>((set) => ({
    // initialize with empty strings to avoid `undefined` in consumers
    text: '',
    tone: '',
    language: '',
    resultType: '',

    setValue: (field: UserInputField, newValue = '') => {
        set(() => {
            switch (field) {
                case UserInputField.Language:
                    return { language: newValue };
                case UserInputField.ResultType:
                    return { resultType: newValue };
                case UserInputField.Text:
                    return { text: newValue };
                case UserInputField.Tone:
                    return { tone: newValue };
                default:
                    return {};
            }
        });
    },
}));


export interface HumanizerResultsState {
    result: string | null;
    changes: string[] | null;
    score: number | null;
    isLoading: boolean;
    updateLoading: (isLoading: boolean) => void;
    updateResult: (results: HumanizerResult[]) => void;
    resetState: () => void;
}

export type HumanizerResult = {
    result: string | null;
    humanized_score: number | null;
    changes?: string[];
};

export const useHumanizerResultsStore = create<HumanizerResultsState>((set) => ({
    result: null,
    changes: null,
    score: null,
    isLoading: false,
    resetState: () => {
        set(() => ({
            result: null,
            changes: null,
            score: null,
            isLoading: false
        }));
    },
    updateResult: (results: HumanizerResult[]) => {
        console.log("RESULTS: ", results);
      
        const last = results[results.length - 1];
      
        set(() => ({
          result: last?.result ?? null,
          score: last?.humanized_score ?? null,
          changes: results.reduce(
            (acc: string[], cur: HumanizerResult) => acc.concat(cur.changes ?? []),
            []
          ),
          isLoading: false
        }));
      },

    updateLoading: (isLoading: boolean) => {
        set(() => ({
            isLoading
        }));
    }
}));

