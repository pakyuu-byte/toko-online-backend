const express=require('express'); const router=express.Router(); const auth=require('../middlewares/auth.middleware'); const ctrl=require('../controllers/cart.controller');
router.use(auth);
router.get('/', ctrl.getCart);
router.post('/', ctrl.addToCart);
router.delete('/:productId', ctrl.removeFromCart);
module.exports=router;
