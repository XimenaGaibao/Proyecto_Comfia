const express = require('express');
const router = express.Router();
const usuarioController = require('../controladores/usuarioController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/', adminMiddleware, usuarioController.getAll);
router.get('/:id', usuarioController.getById);
router.post('/', adminMiddleware, usuarioController.create);
router.put('/:id', adminMiddleware, usuarioController.update);
router.delete('/:id', adminMiddleware, usuarioController.delete);
router.put('/:id/password', usuarioController.changePassword);
router.get('/profile', usuarioController.getProfile);
router.put('/profile', usuarioController.updateProfile);
router.put('/change-password', usuarioController.changePassword);

module.exports = router;