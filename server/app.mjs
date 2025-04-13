import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import connectDB from './config/db.mjs';
const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.mjs'
import problemRoutes from './routes/problemRoutes.mjs';

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

app.use(express.json()); // Parse JSON requests
app.use(cookieParser()); // Parse cookies
app.use(cors({ 
    origin: "http://localhost:5173", // Replace with frontend URL
    credentials: true // Allow cookies
}));

connectDB();
app.use("/api/auth", authRoutes);
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/problems', problemRoutes);



export default app ;