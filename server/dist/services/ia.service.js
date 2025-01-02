"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateText = exports.transcript = exports.createAudio = void 0;
const tslib_1 = require("tslib");
const openai_1 = require("openai");
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const generative_ai_1 = require("@google/generative-ai");
const server_1 = require("@google/generative-ai/server");
const fileManager = new server_1.GoogleAIFileManager(process.env.GEMINI_API_KEY);
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const cacheManager = new server_1.GoogleAICacheManager(process.env.GEMINI_API_KEY);
const openai = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
const createAudio = async (message, id, voice) => {
    try {
        const folder = 'audios/';
        const speechFile = path_1.default.resolve(`../files/audios/${id}.mp3`);
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: voice,
            input: message,
            speed: 0.75
        });
        const buffer = Buffer.from(await mp3.arrayBuffer());
        await fs_1.default.promises.writeFile(speechFile, buffer);
        return ({
            state: true,
            url: `${process.env.URL}${folder}${id}.mp3`,
            fileName: `${id}.mp3`
        });
    }
    catch (error) {
        return ({
            state: false,
            error: error
        });
    }
};
exports.createAudio = createAudio;
const transcript = async (fileName) => {
    try {
        const pathFile = path_1.default.resolve(`../files/audios/${fileName}`);
        const newFile = fs_1.default.createReadStream(pathFile);
        const transcription = await openai.audio.transcriptions.create({
            file: newFile,
            model: "whisper-1",
            response_format: "verbose_json",
            timestamp_granularities: ["segment"]
        });
        /* return resp.data */
        return transcription;
    }
    catch (error) {
        console.log(error);
        if (error.toJSON) {
            console.log(error.toJSON);
        }
        if (error.response) {
            error.response.data.error;
        }
    }
};
exports.transcript = transcript;
const translateText = async (text, language) => {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `Necesito que me respondas solo con la traducción al ${language} del siguiente texto respetando los saltos de línea: "${text}". Nada más.`
            }
        ],
        model: "gpt-4o-mini",
    });
    return completion;
};
exports.translateText = translateText;
//# sourceMappingURL=ia.service.js.map