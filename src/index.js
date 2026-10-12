const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/product.routes');
app.use('/api/products', productRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API Toko Online Jalan!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});