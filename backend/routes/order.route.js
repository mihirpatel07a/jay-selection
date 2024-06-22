import express from 'express'
import { createOrder } from '../Controllers/Item.controller.js';

const app = express();

const router = express.Router();

router.post('/create' , createOrder);

export default router;