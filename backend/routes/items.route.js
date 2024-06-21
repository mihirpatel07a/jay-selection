import express from "express";
import { createItem, deleteItem, getAllItems, getItem, updateItem } from "../Controllers/Item.controller.js";

const app = express();

const router = express.Router();

router.post('/createitem' , createItem );
router.get('/getitems' , getAllItems);
router.delete('/deleteitem/:id' , deleteItem);
router.put('/updateitem/:id' , updateItem);
router.get('/getitem/:id' , getItem);


export default router;