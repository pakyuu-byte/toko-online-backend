const express = require('express');
const router = express.Router();
const { createPayment, midtransWebhook } = require('../controllers/payment.controller');
const auth = require('../middleware/auth.middleware');

router.post('/create-payment', auth, createPayment);
router.post('/midtrans-webhook', midtransWebhook);

module.exports = router;
