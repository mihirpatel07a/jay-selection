import express from "express";
import cookieparser from 'cookie-parser';
import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import itemRouter from "./routes/items.route.js";
import queryRouter from "./routes/query.route.js";
import Razorpay from "razorpay";
import cors from "cors";
import bodyParser from "body-parser";
import orderRouter from "./routes/order.route.js"

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=> {
    console.log("connected to mongodb");
})



const port = 3000;

console.log('Razorpay Key ID:', process.env.REACT_APP_RAZORPAY_KEY_ID);
console.log('Razorpay Key Secret:', process.env.RAZORPAY_KEY_SECRET);

const razorpay = new Razorpay({
  key_id: process.env.REACT_APP_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

app.use(bodyParser.json());
app.use(cors());



app.use(express.json());
app.use(cookieparser());

app.use('/api/user' , userRouter);
app.use('/api/auth' , authRouter);
app.use('/api/item' , itemRouter);
app.use('/api/order' , orderRouter);
app.use('/api/query' , queryRouter);

app.get('/api/payment/key', (req, res) => {
  res.send({ key: process.env.REACT_APP_RAZORPAY_KEY_ID });
});

app.post('/api/payment/order', async (req, res) => {
  const { amount, currency, receipt } = req.body;

  try {
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: currency,
      receipt: receipt
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});




app.listen(port, ()=> {
  console.log(`server is running on ${port}`);
});