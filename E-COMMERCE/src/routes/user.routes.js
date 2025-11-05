import { Router } from "express";

import {signup,login, logout,profile,refreshToken } from "../controllers/user.controllers.js";


const router = Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.get('/refresh-token',refreshToken)
router.get('/profile',profile)


export default router;