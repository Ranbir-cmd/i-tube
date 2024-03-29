// require('dotenv').config({path: "./env"})
import dotenv from 'dotenv'
import connectDB from "./db/dbConnection.js";
import { app } from './app.js';

dotenv.config({path: "./.env"})

// import express from "express";
// const app = express();

// 1st approach 
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })
