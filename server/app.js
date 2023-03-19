import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { connect as MongoConnect } from "./db/connection.js";

import dalleRoute from './routes/dalle.js'
import postRoute from './routes/post.js'

dotenv.config()



const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1/post', postRoute)
app.use('/api/v1/dalle', dalleRoute)

MongoConnect((error) => {
    if (error) return console.log('DB error : ', error)

    console.log('MongoDB connected')

    app.listen(port, () => {
        console.log("DALL-E server started")
    })
})
