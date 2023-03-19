import express from "express";
import dotnev from 'dotenv'
import { OpenAIApi, Configuration } from "openai";

dotnev.config()

const router = express.Router()

const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

router.get('/', (req, res) => {
    res.send("Hello Welcome To Dall-E Api v1")
})

router.post('/', async (req, res) => {
    try {
        const { prompt } = req.body

        const response = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        })

        const image = response.data.data[0].b64_json

        res.status(200).json({ image: image })
    } catch (error) {
        console.log(error)

        res.status(500).send(error?.response?.data?.error?.message)
    }
})

export default router