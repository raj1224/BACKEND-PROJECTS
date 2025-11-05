import express from 'express';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || 8000;


app.get('/',(req,res)=>{
    res.send('hello this is ecommerce api')
})

app.listen(PORT,()=>{
    console.log(`server is listening on port http://localhost:${PORT}`);
})