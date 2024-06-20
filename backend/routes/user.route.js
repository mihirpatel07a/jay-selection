import express from 'express';
import { UpdateUser, deleteUSer, getUsers, test } from '../Controllers/user.controller.js';






const router = express.Router();


router.get('/temp' , test);
router.delete('/delete/:id' , deleteUSer);
router.put('/update/:id' , UpdateUser);
router.get('/getusers' , getUsers);

export default router;