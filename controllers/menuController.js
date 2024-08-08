const Menu = require("../models/Menu");
const { logger } = require("../middleware/logger");

const getMenus = async (req, res) => {
    try {
        const menus = await Menu.find({}).populate("products");
        res.json(menus);
    } catch (err) {
        logger.error(`Error getting menus: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

const createMenu = async (req, res) => {
    try {
        const { category, products } = req.body;
        const menu = new Menu({
            category,
            products,
        });
        const createdMenu = await menu.save();
        res.status(201).json(createdMenu);
    } catch (err) {
        logger.error(`Error creating menu: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};
module.exports = { getMenus, createMenu };
