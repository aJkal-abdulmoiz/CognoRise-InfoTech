const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Define routes
router.post('/pay', paymentController.initiatePayment);

module.exports = router;
