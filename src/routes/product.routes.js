const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { authenticate, isAdmin } = require('../middlewares/auth.middleware');

router.get('/', productController.getAll);
router.get('/:id', productController.getById);

router.post('/', authenticate, isAdmin, productController.create);
router.put('/:id', authenticate, isAdmin, productController.update);
router.delete('/:id', authenticate, isAdmin, productController.delete);

module.exports = router;