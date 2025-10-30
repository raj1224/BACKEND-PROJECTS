import express from 'express';

import { signup,login,logout,updateProfile,subscribe } from '../controllers/user.controllers.js';
const router=express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.post('/update-profile',updateProfile)
router.post('/subscribe',subscribe)


export default router;

