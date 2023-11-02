const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);  // Create a new product
router.get('/:productId', productController.getProductById); // Get product by ID
router.put('/:productId', productController.updateProduct); // Update product by ID
router.delete('/:productId', productController.deleteProduct); // Delete product by ID

module.exports = router;
