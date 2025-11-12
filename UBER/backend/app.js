import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './config/db.config.js';
import userRoutes from './routes/user.routes.js';


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/v1/auth', userRoutes)

export default app;