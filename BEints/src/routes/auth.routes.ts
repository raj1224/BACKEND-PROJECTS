import {Router} from 'express';

import { loginUser ,registerUser,getProfile,logoutUser} from '../controllers/auth.controller';
import { auth } from "../middleware/auth.middleware";


const router = Router();

router.post('/signup',registerUser)
router.post('/login',loginUser)
router.post('/logout',logoutUser)
router.get('/profile',auth,getProfile)

export default router;