import express from 'express'
import { Signin, Signup, google } from '../Controllers/Auth.controller.js';

const router = express.Router();

router.post('/signin', Signin);
router.post('/signup' , Signup);
router.post('/google' , google);
export default router;