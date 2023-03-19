import express from "express";
import collections from "../db/collections.js";
import { db } from '../db/connection.js'
import Imagekit from 'imagekit'
import dotnev from 'dotenv'
import { ObjectId } from "mongodb";

dotnev.config()

const router = express.Router()

const imagekit = new Imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

router.get('/', async (req, res) => {
    try {
        let posts = await db.collection(collections.POST).find().toArray()

        res.status(200).json({
            status: 200,
            message: 'Success',
            data: posts
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            status: 500,
            message: error
        })
    }
})

router.get('/search', async (req, res) => {
    try {
        let posts = await db.collection(collections.POST).find({
            prompt: {
                $regex: req.query.search, $options: 'i'
            }
        }).toArray()

        res.status(200).json({
            status: 200,
            message: 'Success',
            data: posts
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            status: 500,
            message: error
        })
    }
})

router.post('/', async (req, res) => {

    const { photo, prompt, name } = req.body

    const _id = new ObjectId().toHexString()

    try {
        var mediaRes = await imagekit.upload({
            file: photo,
            fileName: `${_id}`
        })

        let postRes = await db.collection(collections.POST).insertOne({
            _id: new ObjectId(_id),
            prompt,
            name,
            photo: mediaRes.url
        })

        res.status(200).json({
            status: 200,
            message: 'Success',
            data: postRes
        })
    } catch (error) {
        console.log(error)

        res.status(500).send({
            status: 500,
            message: error
        })
    }
})

export default router

