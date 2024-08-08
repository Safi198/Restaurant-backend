const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart",
            required: true,
        },
        address: { type: String, required: true },
        paymentMethod: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        isPaid: { type: Boolean, required: true, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, required: true, default: false },
        deliveredAt: { type: Date },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
