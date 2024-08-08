const express = require("express");
const { createOrder, getOrders } = require("../controllers/orderController");
const auth = require("../middleware/auth");
const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get user orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Successfully retrieved orders
 */
router.route("/").get(auth, getOrders);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cartId
 *               - address
 *               - paymentMethod
 *               - totalPrice
 *             properties:
 *               cartId:
 *                 type: string
 *               address:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *               totalPrice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Successfully created order
 */
router.route("/").post(auth, createOrder);

module.exports = router;
