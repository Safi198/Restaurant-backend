const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { logger } = require("../middleware/logger");

const createOrder = async (req, res) => {
    try {
        const { cartId, address, paymentMethod, totalPrice } = req.body;
        const cart = await Cart.findById(cartId);
        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
            return;
        }
        const order = new Order({
            user: req.user._id,
            cart: cartId,
            address,
            paymentMethod,
            totalPrice,
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (err) {
        logger.error(`Error creating order: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate(
            "cart"
        );
        res.json(orders);
    } catch (err) {
        logger.error(`Error getting orders: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createOrder, getOrders };
