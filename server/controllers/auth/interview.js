import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function liveInterview(req, res) {
    if (!req.body) {
        res.status(401).json({ message: 'no prompt is provided' })
    }
    const body = req.body

    try {

        //OPEN AI
        // const client = new OpenAI({
        //     apiKey: process.env.SIR_OPENAI_API_KEY, // This is the default and can be omitted
        // });

        // const response = await client.responses.create({
        //     model: 'gpt-5.5',
        //     input: body.prompt,
        // });

        // console.log(response.output_text, 'response');

        //GEMINI AI
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: body.prompt,
        });
        console.log(response.text);


        res.send("worikinggg")
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

}