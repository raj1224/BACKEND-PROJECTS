import express from 'express';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';

import { connectDB } from './config/db.config.js';
import userRoutes from './routes/user.routes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

app.get('/',(req,res)=>{
    res.json({
        sucess:true,
        log:'this is just testing route'
    })
})

app.use('/api/v1/users/',userRoutes);

connectDB()
.then(app.listen(PORT,()=>{
    console.log(`server is listening on port http://localhost:${PORT}`);
}))
.catch(
    (err)=>{
        console.error(error.message);
    }
)
