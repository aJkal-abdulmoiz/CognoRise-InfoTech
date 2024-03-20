const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyToken } = require('../utils/authUtils');

// Define routes
router.post('/', bookingController.createBooking);
router.get('/',  bookingController.getBookings);

module.exports = router;
