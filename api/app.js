import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js'; 
import path from 'path';
import cors from 'cors';

dotenv.config();
console.log(process.env);


const mongoURI = process.env.MONGODB_URI;


console.log("MongoDB URI:", process.env.MONGODB_URI); 
const app = express(); 

app.use(cors());
app.use(express.json());

const router = express.Router();


mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use("/api", router); 


router.use("/user", userRoute); 

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Uygulama ${PORT} portunda dinleniyor!`);
});
