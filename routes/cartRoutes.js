const express = require("express");
const {
    getCart,
    addToCart,
    removeFromCart,
} = require("../controllers/cartController");
const auth = require("../middleware/auth");
const router = express.Router();

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get user cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Successfully retrieved cart
 */
router.route("/").get(auth, getCart);

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Successfully added to cart
 */
router.route("/add").post(auth, addToCart);

/**
 * @swagger
 * /api/cart/remove:
 *   post:
 *     summary: Remove product from cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully removed from cart
 */
router.route("/remove").post(auth, removeFromCart);

module.exports = router;
