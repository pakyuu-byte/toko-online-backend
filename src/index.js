const express = require('express');
const cors = require('cors');
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

const cartRoutes = require('./routes/cart.routes');
app.use('/api/cart', cartRoutes);

const orderRoutes = require('./routes/order.routes');
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API Toko Online Jalan!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
