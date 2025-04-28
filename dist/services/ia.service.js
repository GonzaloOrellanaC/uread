"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateText = exports.transcript = exports.createAudio = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const text_to_speech_1 = tslib_1.__importDefault(require("@google-cloud/text-to-speech"));
const ia_connection_1 = require("../configs/ia.connection");
const createAudio = async (message, id, voice) => {
    try {
        const folder = 'audios/';
        const speechFile = path_1.default.resolve(`../files/audios/${id}.mp3`);
        const client = new text_to_speech_1.default.TextToSpeechClient();
        const request = {
            input: { text: message },
            // Select the language and SSML Voice Gender (optional)
            voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
            // Select the type of audio encoding
            audioConfig: { audioEncoding: 'MP3' },
        };
        try {
            const response = await saveAudio(client, request, speechFile, folder, id);
            return response;
        }
        catch ({ name, message }) {
            return ({
                state: false,
                error: { name, message }
            });
        }
        /* const buffer = Buffer.from(await mp3.arrayBuffer());
        await fs.promises.writeFile(speechFile, buffer);
        return ({
                    state: true,
                    url: `${process.env.URL}${folder}${id}.mp3`,
                    fileName: `${id}.mp3`
                })
         */
    }
    catch ({ name, message }) {
        return ({
            state: false,
            error: { name, message }
        });
    }
};
exports.createAudio = createAudio;
const saveAudio = async (client, request, speechFile, folder, id) => {
    return new Promise((resolve, reject) => {
        client.synthesizeSpeech(request, (err, response) => {
            if (err) {
                console.error('ERROR:', err);
                reject(err);
            }
            // Write the binary audio content to a local file
            fs_1.default.writeFile(speechFile, response.audioContent, 'binary', err => {
                if (err) {
                    console.error('ERROR:', err);
                    reject(err);
                }
                console.log(`Audio content written to file: ${id}.mp3`);
                resolve({
                    state: true,
                    url: `${process.env.URL}${folder}${id}.mp3`,
                    fileName: `${id}.mp3`
                });
            });
        });
    });
};
const transcript = async (fileName) => {
    try {
        const pathFile = path_1.default.resolve(`../files/audios/${fileName}`);
        const newFile = fs_1.default.createReadStream(pathFile);
        const transcription = await ia_connection_1.openai.audio.transcriptions.create({
            file: newFile,
            model: "deepseek-chat",
        });
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
    const completion = await ia_connection_1.openai.chat.completions.create({
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