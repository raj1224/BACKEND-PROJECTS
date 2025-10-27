import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected successfully🟢");
    } catch (error) {
        console.log('mongoDB connection failed', error);
    }
}

