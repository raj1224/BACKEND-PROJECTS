import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './lib/db.js';
import authRoutes from './routes/user.routes.js';


const app = express();

dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || 8000;


app.get('/',(req,res)=>{
    res.send('hello this is ecommerce api')
})

app.use('/api/v1/auth',authRoutes);

connectDB()
.then(app.listen(PORT,()=>{
    console.log(`server is listening on port http://localhost:${PORT}`);
})).catch((error)=>{
    console.log('Failed to connect to the database. Server not started.', error.message);
});
