const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/product.controller');
const auth = require('../middleware/auth.middleware');
const upload = require('../middlewares/upload');
const { uploadProductImage } = require('../controllers/upload.controller');

router.get('/', ctrl.getProducts);
router.get('/:id', ctrl.getProductById);
router.post('/', auth, ctrl.createProduct);
router.put('/:id', auth, ctrl.updateProduct);
router.delete('/:id', auth, ctrl.deleteProduct);
router.post('/upload', auth, upload.single('image'), uploadProductImage);

module.exports = router;
