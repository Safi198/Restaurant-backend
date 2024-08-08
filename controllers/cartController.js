const Cart = require("../models/Cart");
const { logger } = require("../middleware/logger");

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate(
            "products.product"
        );
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (err) {
        logger.error(`Error getting cart: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) => p.product.toString() === productId
            );
            if (productIndex >= 0) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }
        } else {
            cart = new Cart({
                user: req.user._id,
                products: [{ product: productId, quantity }],
            });
        }
        cart.totalPrice = cart.products.reduce(
            (total, p) => total + p.quantity * p.product.price,
            0
        );
        const updatedCart = await cart.save();
        res.status(201).json(updatedCart);
    } catch (err) {
        logger.error(`Error adding to cart: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            cart.products = cart.products.filter(
                (p) => p.product.toString() !== productId
            );
            cart.totalPrice = cart.products.reduce(
                (total, p) => total + p.quantity * p.product.price,
                0
            );
            const updatedCart = await cart.save();
            res.status(201).json(updatedCart);
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (err) {
        logger.error(`Error removing from cart: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};
module.exports = { getCart, addToCart, removeFromCart };
