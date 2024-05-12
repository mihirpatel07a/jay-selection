import express from 'express';
import { deleteUSer, test } from '../Controllers/user.controller.js';






const router = express.Router();


router.get('/temp' , test);
router.delete('/delete/:id' , deleteUSer);


export default router;