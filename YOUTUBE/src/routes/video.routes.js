import express from 'express';

import { uploadVideo, updateVideo, deletedVideo, getAllVideo, getOwnVideo } from '../controllers/video.controllers.js';
import { checkAuth } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post('/upload_video',checkAuth,uploadVideo);
router.post('/update_video',updateVideo);
router.post('/delete_video',deletedVideo);
router.post('/getAll_video',getAllVideo);
router.post('/getOwn_video',getOwnVideo);

export default router;