import express from 'express'
import { createOrder, getAllOrders, getOrders } from '../Controllers/order.controller.js';


const app = express();

const router = express.Router();

router.post('/create' , createOrder);
router.get('/getorders/:email' , getOrders);
router.get('/getorders' , getAllOrders);
export default router;