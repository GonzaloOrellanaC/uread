import fs from "fs";
import path from 'path';
import textToSpeech, { protos, TextToSpeechClient } from '@google-cloud/text-to-speech';
import { openai } from "@/configs/ia.connection";

export const createAudio = async (
    message: string, id: number, voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer") => {
    try {
        const folder = 'audios/'
        const speechFile = path.resolve(`../files/audios/${id}.mp3`);
        const client = new textToSpeech.TextToSpeechClient();
        const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
            input: {text: message},
            // Select the language and SSML Voice Gender (optional)
            voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},
            // Select the type of audio encoding
            audioConfig: {audioEncoding: 'MP3'},
        };
        try {
            const response = await saveAudio(client, request, speechFile, folder, id)
            return response
        } catch ({name, message}) {
            return ({
                state: false,
                error: {name, message}
            })
        }
          
        /* const buffer = Buffer.from(await mp3.arrayBuffer());
        await fs.promises.writeFile(speechFile, buffer);
        return ({
                    state: true,
                    url: `${process.env.URL}${folder}${id}.mp3`,
                    fileName: `${id}.mp3`
                })
         */
    } catch ({name, message}) {
        return ({
            state: false,
            error: {name, message}
        })
    }
}

const saveAudio = async (
    client: TextToSpeechClient, 
    request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest, 
    speechFile: string,
    folder: string,
    id: number) => {
    return new Promise((resolve, reject) => {
        client.synthesizeSpeech(request, (err, response) => {
            if (err) {
                console.error('ERROR:', err);
                reject(err)
            }
            
            // Write the binary audio content to a local file
            fs.writeFile(speechFile, response.audioContent, 'binary', err => {
                if (err) {
                    console.error('ERROR:', err);
                    reject(err)
                }
                console.log(`Audio content written to file: ${id}.mp3`);
                resolve({
                    state: true,
                    url: `${process.env.URL}${folder}${id}.mp3`,
                    fileName: `${id}.mp3`
                })
                
            });
        });
    })
}

export const transcript = async (fileName: string) => {
    try {
        const pathFile = path.resolve(`../files/audios/${fileName}`)
        const newFile: any = fs.createReadStream(pathFile)
        const transcription = await openai.audio.transcriptions.create({
            file: newFile,
            model: "deepseek-chat",
        })
        return transcription
    } catch (error) {
        console.log(error)
        if (error.toJSON) {
            console.log(error.toJSON)
        }
        if (error.response) {
            error.response.data.error
        }
    }
}

export const translateText = async (text: string, language: string) => {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `Necesito que me respondas solo con la traducción al ${language} del siguiente texto respetando los saltos de línea: "${text}". Nada más.`
            }
        ],
        model: "gpt-4o-mini",
    });

    return completion
}