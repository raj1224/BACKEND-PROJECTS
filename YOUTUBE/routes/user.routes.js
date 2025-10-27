import express from 'express';

import {signupUser, loginUser, getUserProfile} from '../controllers/user.controllers.js';
const router = express.Router();

router.post('/signup',signupUser);
router.post('/login',loginUser);
router.get('/profile',getUserProfile);

export default router;