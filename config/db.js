const mongoose = require('mongoose');
const { logger } = require('../middleware/logger');
const dotenv = require("dotenv");

dotenv.config();

const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            logger.info("MongoDB connected");
        })
        .catch((err) => {
            logger.error(`MongoDB connection error: ${err.message}`);
            process.exit(1);
        });
};

module.exports = connectDB;