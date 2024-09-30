// import mongoose from 'mongoose';
// import express from 'express';
// import dotenv from 'dotenv';
// import userRoute from './routes/user.route.js';
// import cors from 'cors';

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.log("MongoDB connection error:", err);
//   });


// app.use("/api/user", userRoute); 

// app.use((err, req, res, next) => {
//   const statusCode = err.status || 500;
//   const message = err.message || "Internal Server Error";

//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Uygulama ${PORT} portunda dinleniyor!`);
// });

import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js'; // Kendi route dosyanıza göre ayarlayın
import path from 'path';
import cors from 'cors';

// .env dosyasını yüklemek için dotenv'i kullan
dotenv.config();
console.log(process.env);


const mongoURI = process.env.MONGODB_URI;

// MongoDB URI'nin doğru yüklendiğini kontrol etmek için aşağıdaki satırı kullanabilirsin
console.log("MongoDB URI:", process.env.MONGODB_URI); // Bu satır bağlantı sorunlarını teşhis etmenize yardımcı olabilir

const app = express(); 

// CORS ve JSON parse middleware'lerini ekle
app.use(cors());
app.use(express.json());

const router = express.Router();

// MongoDB'ye bağlan
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// API endpoint'leri ekle
app.use("/api", router); 

// User route
router.use("/user", userRoute); 

// Hata yakalama middleware'i
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Uygulamayı dinleyecek portu ayarla
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Uygulama ${PORT} portunda dinleniyor!`);
});
