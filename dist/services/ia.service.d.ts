export declare const createAudio: (message: string, id: number, voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer") => Promise<unknown>;
export declare const transcript: (fileName: string) => Promise<import("openai/resources/audio/transcriptions").Transcription & {
    _request_id?: string;
}>;
export declare const translateText: (text: string, language: string) => Promise<import("openai/resources").ChatCompletion & {
    _request_id?: string;
}>;
