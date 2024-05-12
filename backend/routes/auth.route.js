import express from 'express'
import { Signin, Signout, Signup, google} from '../Controllers/Auth.controller.js';

const router = express.Router();

router.post('/signin', Signin);
router.post('/signup' , Signup);
router.post('/google' , google);
router.get('/signout' , Signout);

export default router;