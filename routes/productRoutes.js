const express = require("express");
const {
    getProducts,
    getProductById,
    createProduct,
} = require("../controllers/productController");
const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successfully retrieved products
 */
router.route("/").get(getProducts).post(createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Successfully retrieved product
 *       404:
 *         description: Product not found
 */
router.route("/:id").get(getProductById);

module.exports = router;
