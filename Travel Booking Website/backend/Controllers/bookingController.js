const bodyParser = require('body-parser');
const Booking = require('../models/booking');

const createBooking = async (req, res) => {
// Assuming userId is extracted from the authenticated user
    const { name, destination, date, price, phone, persons } = req.body;

    try {
        const newBooking = new Booking({
            userId,
            name,
            destination,
            date,
            price,
            phone,
            persons
        });

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
};

const getBookings = async (req, res) => {
    const { userId } = req.user.id; // Assuming userId is extracted from the authenticated user

    try {
        const bookings = await Booking.find({ userId });
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).send('Internal server error');
    }
};

module.exports = {
    createBooking,
    getBookings
};
