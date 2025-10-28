import mongoose from "mongoose";

import videoModel from "../models/video.model.js";
import cloudinary from "../config/cloudinary.js";

export const uploadVideo = async (req, res) => {
    // upload video controller
    try {
        const { title, description, category, tags } = req.body;
        if(!req.files || !req.files.videoFile || !req.files.thumbnailFile){
            return res.status(400).json({
                success:false,
                message:'Video file and Thumbnail file are required',
            });
        }
        const videoUpload = await cloudinary.uploader.upload(req.files.videoFile.tempFilePath, {
            resource_type: "video",
            folder: "videos",
        })
        const thumbnailUpload = await cloudinary.uploader.upload(req.files.thumbnailFile.tempFilePath, {
            folder: "thumbnails",
        });
        const newVideo = new videoModel({
            _id: new mongoose.Types.ObjectId(),
            title,
            description,
            user_id: req.user._id,
            videoUrl: videoUpload.secure_url,
            thumbnailUrl: thumbnailUpload.secure_url,
            thumbnailId: thumbnailUpload.public_id,
            category,
            tags: tags ? tags.split(',') : [],
        });
        await newVideo.save();
        res.status(201).json({
            success:true,
            message:'Video uploaded successfully',
            video:newVideo,
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Server Error',
            error:error.message,
        });
    }
};

export const updateVideo = async (req, res) => {};

export const deletedVideo = async (req, res) => {};

export const getAllVideo = async (req, res) => {};

export const getOwnVideo = async (req, res) => {};