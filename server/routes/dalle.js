import express from "express";
import { OpenAIApi, Configuration } from "openai";

const router = express.Router()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

router.get('/', (req, res) => {
    res.send("Hello Welcome To Dall-E Api v1")
})

export default router