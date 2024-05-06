import express from "express";
import mongoose, { mongo } from "mongoose";

const app = express();





const port = 3000;



Dotenv.config();

app.listen(port, ()=> {
  console.log(`server is running on ${port}`);
});