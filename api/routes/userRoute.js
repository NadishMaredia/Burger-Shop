const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes
router.post('/user/signup', userController.signup);
router.post('/user/login', userController.login);
// router.put('/user/update/:id', userController.updateUser);
router.put('/user/password/:id', userController.updatePassword);

module.exports = router;
