const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define routes
router.post('/product', productController.addProduct);
router.get('/product', productController.getAllProducts);

module.exports = router;
