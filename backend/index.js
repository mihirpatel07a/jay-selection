import express from "express";
import cookieparser from 'cookie-parser';
import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=> {
    console.log("connected to mongodb");
})



const port = 3000;

app.use(express.json());
app.use(cookieparser());

app.use('/api/user' , userRouter);
app.use('/api/auth' , authRouter);

app.listen(port, ()=> {
  console.log(`server is running on ${port}`);
});