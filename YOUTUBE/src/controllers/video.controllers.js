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

export const updateVideo = async (req, res) => {
    // 🔹 Update Video (No Video Change, Only Metadata & Thumbnail)

  try {
    const { title, description, category, tags } = req.body;
    const videoId = req.params.id;

    // Find Video
    let video = await Video.findById(`video/${videoId}`);
    if (!video) return res.status(404).json({ error: "Video not found" });

    // Ensure Only the Owner Can Update
    if (video.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // If new thumbnail provided, delete old one & upload new
    if (req.files && req.files.thumbnail) {
      await cloudinary.uploader.destroy(video.thumbnmailId); // Delete old thumbnail

      const thumbnailUpload = await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath, {
        folder: "thumbnails",
      });

      video.thumbnmailUrl = thumbnailUpload.secure_url;
      video.thumbnmailId = thumbnailUpload.public_id;
    }

    // Update Fields
    video.title = title || video.title;
    video.description = description || video.description;
    video.category = category || video.category;
    video.tags = tags ? tags.split(",") : video.tags;

    await video.save();
    res.status(200).json({ message: "Video updated successfully", video });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }



};

export const deletedVideo = async (req, res) => {};

export const getAllVideo = async (req, res) => {};

export const getOwnVideo = async (req, res) => {};