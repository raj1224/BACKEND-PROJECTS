import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const DBconnect = async()=>{
    try {
        mongoose.connect(process.env.MONGO_URL!);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed", error);
    }
}