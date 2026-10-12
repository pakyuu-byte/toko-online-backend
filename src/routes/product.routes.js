const express=require('express'); const router=express.Router(); const ctrl=require('../controllers/product.controller'); const auth=require('../middlewares/auth.middleware');
router.get('/', ctrl.getProducts);
router.get('/:id', ctrl.getProductById);
router.post('/', auth, ctrl.createProduct);
router.put('/:id', auth, ctrl.updateProduct);
router.delete('/:id', auth, ctrl.deleteProduct);
module.exports=router;
