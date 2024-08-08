const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    category: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
