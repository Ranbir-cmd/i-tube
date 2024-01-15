// require('dotenv').config({path: "./env"})
import dotenv from 'dotenv'
import connectDB from "./db/dbConnection.js";
import { app } from './app.js';

dotenv.config({path: "./env"})

// import express from "express";
// const app = express();

// 1st approach 
connectDB()
.then(() => {
    app.on("error", (err) => {
        console.log( "Error", err);
        throw err;
    })
    app.listen( process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("Mongo db connection error", error);
})

// // 2nd approach 
// // using iife here (()=> {})()
// ( async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

//         app.listen(process.env.PORT, ()=>{
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error("DB connection error ", error);
//     }
// })()