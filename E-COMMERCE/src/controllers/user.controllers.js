import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup=async(req,res)=>{
    const {name,email,password}=req.body;
    try {
        const existingUser = await User.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message:'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
        });
        await newUser.save();
        res.status(201).json({message:'User created successfully'});
    } catch (error) {
        res.status(500).json({message:'Something went wrong',error:error.message});
    }
};
export const login=async(req,res)=>{};
export const logout=async(req,res)=>{};
export const profile=async(req,res)=>{};
export const refreshToken=async(req,res)=>{};