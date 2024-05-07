import express from 'express'
import { Signin, Signup } from '../Controllers/Auth.controller.js';

const router = express.Router();

router.post('/signin', Signin);
router.post('/signup' , Signup );

export default router;