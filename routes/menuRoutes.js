const express = require("express");
const { getMenus, createMenu } = require("../controllers/menuController");
const router = express.Router();

/**
 * @swagger
 * /api/menus:
 *   get:
 *     summary: Get all menus
 *     tags: [Menus]
 *     responses:
 *       200:
 *         description: Successfully retrieved menus
 */
router.route("/").get(getMenus).post(createMenu);

module.exports = router;
