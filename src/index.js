// require('dotenv').config({path: "./env"})
import dotenv from 'dotenv'
import connectDB from "./db/dbConnection.js";

dotenv.config({path: "./env"})

// import express from "express";
// const app = express();

// 1st approach 
connectDB()


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