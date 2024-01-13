const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Define routes
router.post('/category', categoryController.addCategory);
router.get('/category', categoryController.getAllCategories);

module.exports = router;
