import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './config/db.config.js';
import userRoutes from './routes/user.routes.js';
import captainRoutes from './routes/captain.routes.js';


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/captain', captainRoutes)

export default app;