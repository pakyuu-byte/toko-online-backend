const express=require('express'); const router=express.Router(); const auth=require('../middlewares/auth.middleware'); const ctrl=require('../controllers/order.controller');
router.use(auth);
router.post('/checkout', ctrl.checkout);
router.get('/', ctrl.myOrders);
module.exports=router;
