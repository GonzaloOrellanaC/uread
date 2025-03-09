import OpenAI from 'openai'
import { deepSeekApiKey } from './env';

export const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: deepSeekApiKey
});