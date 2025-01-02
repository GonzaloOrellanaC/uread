import { OpenAI } from 'openai';
export declare const createAudio: (message: string, id: number, voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer") => Promise<{
    state: boolean;
    url: string;
    fileName: string;
    error?: undefined;
} | {
    state: boolean;
    error: any;
    url?: undefined;
    fileName?: undefined;
}>;
export declare const transcript: (fileName: string) => Promise<OpenAI.Audio.Transcriptions.Transcription & {
    _request_id?: string;
}>;
export declare const translateText: (text: string, language: string) => Promise<OpenAI.Chat.Completions.ChatCompletion & {
    _request_id?: string;
}>;
