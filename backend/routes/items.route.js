import express from "express";
import { createItem } from "../Controllers/Item.controller.js";

const app = express();

const router = express.Router();

router.post('/createitem' , createItem );



export default router;