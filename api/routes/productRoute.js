const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

// Define routes
router.post('/product', productController.addProduct);
router.get('/product/:category', productController.getAllProducts);

module.exports = router;
