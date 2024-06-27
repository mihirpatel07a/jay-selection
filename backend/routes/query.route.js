import express from 'express';
import { deleteQuery, getAllQueries } from '../Controllers/query.controller.js';

const router = express.Router();

router.get('/getqueries' , getAllQueries);
router.delete('/delete/:id' , deleteQuery);

export default router;