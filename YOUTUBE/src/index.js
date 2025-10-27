import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './config/db.config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/',(req,res)=>{
    res.json({
        sucess:true,
        log:'this is just testing route'
    })
})

connectDB()
.then(app.listen(PORT,()=>{
    console.log(`server is listening on port http://localhost:${PORT}`);
}))
.catch(
    (err)=>{
        console.error(error.message);
    }
)
