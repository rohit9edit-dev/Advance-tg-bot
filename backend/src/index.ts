import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import jobRoutes from './routes/jobRoutes';
import schemeRoutes from './routes/schemeRoutes';
import aiRoutes from './routes/aiRoutes';
import { createOrder, verifyPayment } from './controllers/paymentController';
import { protect } from './middleware/auth';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/ai', aiRoutes);

// Payments
app.post('/api/payments/order', protect, createOrder);
app.post('/api/payments/verify', protect, verifyPayment);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
