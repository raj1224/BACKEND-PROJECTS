import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import User from '../models/users.model.js';
import cloudinary from '../config/cloudinary.js';

export const signup=async(req,res)=>{
    const {channelName,email,password,phone}=req.body;
   
    try {
        const hashedPassword=await bcrypt.hash(password,10);
        const uploadImage=await cloudinary.uploader.upload(req.files.logoUrl.tempFilePath);
        console.log('IMAGE👉',uploadImage);
        
        const newUser = new User({
            _id:new mongoose.Types.ObjectId,
            channelName,
            email,
            password:hashedPassword,
            phone,
            logoUrl:uploadImage.secure_url,
            logoId:uploadImage.public_id
        })
        let user=await newUser.save();
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            user
        });
    } catch (error) {
        console.error(error);
    res.status(500).json({
        success: false,
        message: 'Server Error',
      error:error,
    });
    }

}

export const login=()=>{}

export const logout=()=>{}

export const subscribe=()=>{}

export const updateProfile=()=>{}