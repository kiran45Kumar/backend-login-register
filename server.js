import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/routes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());


app.use('/api/auth',authRoutes);
app.listen(3000, ()=>{
    console.log(`Server running on http://localhost:3000`);
    
})