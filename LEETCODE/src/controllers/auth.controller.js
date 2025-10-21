import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import {db} from '../lib/db.js';
import {UserRole} from '../generated/prisma/index.js'

export const register= async(req,res)=>{

    const {name,email,password}=req.body;
    if (!name || !email || !password) {
  return res.status(400).json({
    success: false,
    error: 'All fields (name, email, password) are required'
  });
}
    try {

        const existingUser= await db.user.findUnique({
            where:{email}
        })
        if(existingUser){
            return res.status(400).json({
                success:false,
                error:'user already exists'
            })
        }

        const hashdedPassword = await bcrypt.hash(password,10);

        const newUser = await db.user.create({
            data:{
                email,
                password:hashdedPassword,
                name,
                role:UserRole.USER
            }
        })
        const token = jwt.sign({id:newUser.id},process.env.JWT_SECRET,{
            expiresIn:'7d'
        })
        res.cookie('jwt',token,{
            httpOnly:true,
            sameSite:'strict',
            secure:process.env.NODE_ENV !=='development',
            maxAge:7*24*60*60*1000,
        })

        res.status(201).json({
            message:"user registered successfully",
            user:{
                id:newUser.id,
                email:newUser.email,
                name:newUser.name,
                role:newUser.role,
                image:newUser?.image,

            }
        })
    } catch (error) {
        console.error('registeration error:',error);
        res.status(500).json({
            error:error.message
        })
        
    }
}

export const login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
        const user = await db.user.findUnique({where:{email}})

        if(!user){
            return res.status(404).json({error:'user not found'})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({error:'invalid credentials'})
        }
         const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
            });

        res.cookie('jwt',token,{
            httpOnly:true,
            sameSite:'strict',
            secure:process.env.NODE_ENV !=='development',
            maxAge:7*24*60*60*1000,
        })

        res.status(200).json({
            message:"user login successfully",
            user:{
                id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user?.image

            }
        })

    } catch (error) {
        console.error('login error:',error);
        res.status(500).json({error:'login failed'})   
    }

}
export const logout= async(req,res)=>{
    try {
        res.clearCookie('jwt',{
            httpOnly:true,
            sameSite:'strict',
            secure:process.env.NODE_ENV != 'development',
        })
        res.status(200).json({success:true,message:'logout successful'})
    } catch (error) {
        console.error('logut error:',error);
        res.status(500).json({error:'logout failed'}) 
    }
}

export const checkAuth= async(req,res)=>{
    try {
    res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      user: req.user,
    });
  } catch (error) {
    console.error("Auth Check Error:", error);
    res.status(500).json({ error: "Failed to check authentication" });
  }
} 
