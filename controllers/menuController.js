const Menu = require('../models/Menu');
const { logger } = require('../middleware/logger');

const getMenus = async (req, res) => {
    try {
        const menus = await Menu.find({}).populate('products');
        res.json(menus);
    } catch (error) {
        logger.error(`Error getting menus: ${error.message}`);
        res.status(500).json({ message: error.message });
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
    } catch (error) {
        logger.error(`Error creating menu: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getMenus, createMenu };
