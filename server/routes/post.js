import express from "express";

const router = express.Router()

router.get('/',(req,res)=>{
    res.json("R")
})

export default router