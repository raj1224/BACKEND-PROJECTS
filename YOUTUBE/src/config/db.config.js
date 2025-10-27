import mongoose from 'mongoose';

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('DATABASE CONNECTED SUCCESFULLY 🟢');
    } catch (error) {
        console.log('database not connected:',error.message);
    }
}