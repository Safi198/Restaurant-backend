const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { logger } = require("../middleware/logger");

const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate(
            "products.product"
        );

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.totalPrice = 0;
        for (let i = 0; i < cart.products.length; i++) {
            cart.totalPrice +=
                cart.products[i].quantity * cart.products[i].product.price;
        }

        await cart.save();

        res.json(cart);
    } catch (err) {
        logger.error(`Error getting cart: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

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

        cart.totalPrice = 0;
        for (let i = 0; i < cart.products.length; i++) {
            const productDetails = await Product.findById(
                cart.products[i].product
            );
            cart.totalPrice += cart.products[i].quantity * productDetails.price;
        }

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
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex(
            (p) => p.product.toString() === productId
        );

        if (productIndex === -1) {
            return res
                .status(404)
                .json({ message: "Product not found in cart" });
        }

        cart.products.splice(productIndex, 1);

        cart.totalPrice = 0;
        for (let i = 0; i < cart.products.length; i++) {
            const productDetails = await Product.findById(
                cart.products[i].product
            );
            cart.totalPrice += cart.products[i].quantity * productDetails.price;
        }

        await cart.save(); // Save the cart to persist the changes

        res.status(201).json(cart);
    } catch (err) {
        logger.error(`Error removing from cart: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getCart, addToCart, removeFromCart };
