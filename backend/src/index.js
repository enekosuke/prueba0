import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productsRouter from './routes/products.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = process.env.FRONTEND_ORIGIN
  ? process.env.FRONTEND_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean)
  : ['http://localhost:3000'];

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : '*',
    credentials: true,
  })
);
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.warn('MONGO_URI not defined. Product endpoints require a database connection.');
} else {
  mongoose
    .connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => {
      console.error('MongoDB connection error', error);
      process.exit(1);
    });
}

app.get('/health', (_req, res) => {
  res.send('ok');
});

app.use('/products', productsRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
