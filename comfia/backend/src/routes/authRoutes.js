const express = require('express');
const router = express.Router();
const authController = require('../controladores/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify', authMiddleware, authController.verify);

module.exports = router;