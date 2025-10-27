import express from 'express';
import dotenv from 'dotenv';

import userRoutes from './routes/user.routes.js';
import {connectDB} from './config/db.config.js';

dotenv.config();
const app = express();


connectDB();



app.get('/', (req, res) => { 
  res.send('Hello, YouTube!');
});

app.use('/api/v1/users/', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});