const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const orderController = require('../controllers/order.controller');

router.use(auth);
router.post('/checkout', orderController.checkout);
router.get('/', orderController.myOrders);

module.exports = router;