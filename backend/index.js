import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=> {
    console.log("connected to mongodb");
})



const port = 3000;





app.listen(port, ()=> {
  console.log(`server is running on ${port}`);
});