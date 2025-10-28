import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'

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
      error:error.message,
    });
    }

}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const existingUser =await User.findOne({email:email})
        if(!existingUser){
            return res.status(404).json({
                message:'user not found'
            })
        }
        const isValid= await bcrypt.compare(
            password,existingUser.password
        )
        if(!isValid){
            return res.status(500).json({
                message:'invalid credentials'
            })
        }
        const token = jwt.sign({
            _id:existingUser._id,
            email:existingUser.email,
            channelName:existingUser.channelName,
            phone:existingUser.phone,
            logoId:existingUser.logoId
        },process.env.JWT_TOKEN,{expiresIn:'10d'})
        res.status(200).json({
            success:true,
            message:'login successful',
            user:existingUser,
            token:token
        })
         
    } catch (error) {
        console.log(error);
        res.json({ 
            success:false,
            message:'login unsuccessful',
            error:error.message
        })
        
    }
}

export const logout=()=>{}

export const subscribe=()=>{}

export const updateProfile=()=>{}