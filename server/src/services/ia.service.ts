import { OpenAI } from 'openai'
import fs from "fs";
import path from 'path';
import axios from 'axios'
import FormData from 'form-data'

import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager, GoogleAICacheManager } from "@google/generative-ai/server";

const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const cacheManager = new GoogleAICacheManager(process.env.GEMINI_API_KEY);

const openai = new OpenAI(
    {
        apiKey: process.env.OPENAI_API_KEY
    }
);

export const createAudio = async (message: string, id: number, voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer") => {
    try {
        const folder = 'audios/'
        const speechFile = path.resolve(`../files/audios/${id}.mp3`);
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: voice,
            input: message,
            speed: 0.75
          });
        const buffer = Buffer.from(await mp3.arrayBuffer());
        await fs.promises.writeFile(speechFile, buffer);
        return ({
            state: true,
            url: `${process.env.URL}${folder}${id}.mp3`,
            fileName: `${id}.mp3`
        })
    } catch (error) {
        return ({
            state: false,
            error: error
        })
    }
    
}

export const transcript = async (fileName: string) => {
    try {
        const pathFile = path.resolve(`../files/audios/${fileName}`)
        const newFile: any = fs.createReadStream(pathFile)
        const transcription = await openai.audio.transcriptions.create({
            file: newFile,
            model: "whisper-1",
            response_format: "verbose_json",
            timestamp_granularities: ["segment"]
        })

        /* return resp.data */
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