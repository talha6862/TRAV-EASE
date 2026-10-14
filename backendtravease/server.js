import './loadEnv.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/user.js';
import dealerRoutes from './routes/dealerRoutes.js';
import authentication from './routes/authentication.js';
import companyRoutes from './routes/companyRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import travelPreferenceRoutes from "./routes/travelPreferences.js";
import adminRoutes from './routes/adminRoutes.js';
import tourOperatorRoutes from './routes/tourOperatorRoutes.js';
import paymentRoutes from "./routes/paymentRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import tourBookingRoutes from "./routes/tourBookingRoutes.js";
import adminAuthRoutes from "./routes/adminAuth.js";
import bookingRoutes from './routes/bookingRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';
import { UPLOAD_DIR } from './utils/multer.js';
const app = express();
const PORT = process.env.PORT || 8001;
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("❌ MONGO_URI is not set. Copy .env.example to .env and fill it in.");
  process.exit(1);
}

mongoose.set('strictQuery', true);

const connect = async () => {
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,   // fail fast with a clear message
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('   Check MONGO_URI in .env, your Atlas IP Access List, and the database user.');
  }
};

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",").map(o => o.trim());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(UPLOAD_DIR));

app.get('/health', (req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({
    status: 'ok',
    database: states[mongoose.connection.readyState] || 'unknown',
    uptime: Math.round(process.uptime()),
  });
});

app.use('/user', userRoutes);
app.use('/dealers', dealerRoutes);
app.use('/auth', authentication);
app.use('/api', companyRoutes);
app.use('/', feedbackRoutes);
app.use("/api/travel-preferences", travelPreferenceRoutes);
app.use('/admin', adminRoutes);
app.use('/api/tour-operators', tourOperatorRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/tour-bookings", tourBookingRoutes);
app.use("/auth", adminAuthRoutes);
app.use("/api/bookings", bookingRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof Error && /Only images|File too large/.test(err.message)) {
    return res.status(400).json({ success: false, message: err.message });
  }
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

await connect();

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`   Allowed origins: ${allowedOrigins.join(', ')}`);
});
