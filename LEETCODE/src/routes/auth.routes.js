import express from 'express';
import {register,login,checkAuth,logout} from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { getAllSubmissions} from '../controllers/submission.controller.js';

const router= express.Router();


// 1. Register Route
router.post('/register',register);
// 2. Login Route
router.post('/login',login);
// 3. logout Route
router.post('/logout',logout);
// 4. check
router.get('/check',authenticate,checkAuth);
router.get('get-submissions',authenticate,getAllSubmissions)
export default router;