import express from 'express'
import dotenv from 'dotenv'

// import { log } from 'node:console';
import { DBconnect } from './config/config.db';
import authRoutes from './routes/auth.routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('hello ts')
})
// middleware
app.use(express.json())

app.use('/api/v1/auth',authRoutes);

DBconnect()
.then(()=>{app.listen(PORT,()=>{
    console.log(`server is listening on port http://localhost:${PORT}`);
})}
)
.catch((err)=>{
    console.log("Failed to connect to database", err);
})