import express from "express";
import { createCartData, createItem, deleteItem, getAllItems, getCartData, getItem, removeCartItem, updateCart, updateItem } from "../Controllers/Item.controller.js";

const app = express();

const router = express.Router();

router.post('/createitem' , createItem );
router.get('/getitems' , getAllItems);
router.delete('/deleteitem/:id' , deleteItem);
router.put('/updateitem/:id' , updateItem);
router.get('/getitem/:id' , getItem);
router.post('/cartdata' , createCartData);
router.get('/getcartdata/:id' , getCartData);
router.delete('/deletecartitem/:id' , removeCartItem);
router.post('/updatecart' , updateCart);


export default router;