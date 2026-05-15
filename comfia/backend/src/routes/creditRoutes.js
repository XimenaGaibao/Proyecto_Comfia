const express = require('express');
const router = express.Router();
const creditoController = require('../controladores/creditoController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', creditoController.getAll);
router.get('/stats', creditoController.getStats);
router.get('/:id', creditoController.getById);
router.post('/', creditoController.create);
router.put('/:id', creditoController.update);
router.delete('/:id', creditoController.delete);
router.post('/:id/payments', creditoController.addPayment);

module.exports = router;