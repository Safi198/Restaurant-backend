const Product = require("../models/Product");
const { logger } = require("../middlewares/logger");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        logger.error(`Error getting products: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (err) {
        logger.error(`Error getting product by ID: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, category, price, image } = req.body;
        const product = new Product({
            name,
            description,
            category,
            price,
            image,
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (err) {
        logger.error(`Error creating product: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getProducts, getProductById, createProduct };
