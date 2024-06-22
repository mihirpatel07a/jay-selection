import express from 'express'
import { createOrder, getOrders } from '../Controllers/order.controller.js';


const app = express();

const router = express.Router();

router.post('/create' , createOrder);
router.get('/getorders/:email' , getOrders);

export default router;