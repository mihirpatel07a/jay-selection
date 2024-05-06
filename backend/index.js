import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js";

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=> {
    console.log("connected to mongodb");
})



const port = 3000;

app.use(express.json());

app.use('/api/user' , userRouter);


app.listen(port, ()=> {
  console.log(`server is running on ${port}`);
});