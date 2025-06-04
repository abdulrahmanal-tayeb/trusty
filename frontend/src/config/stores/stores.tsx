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


export const useUserInputStore = create<UserInputState>((set: any) => ({
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
    updateResult: (results: HumanizerResultsState) => void;
    resetState: () => void;
}

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
    updateResult: (results: any) => {
        console.log("RESULTS: ", results);
        set(() => ({
            result: results[results.length - 1]?.result ?? null,
            score: results[results.length - 1]?.humanized_score ?? null,
            changes: results.reduce(
                (acc: Array<string>, cur: HumanizerResultsState) => acc.concat(cur.changes ?? []),
                [] as string[],
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

