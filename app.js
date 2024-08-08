const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { logRequest } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const setupSwagger = require('./swagger');


dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(logRequest);

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

setupSwagger(app);

app.use(errorHandler);

module.exports = app;
