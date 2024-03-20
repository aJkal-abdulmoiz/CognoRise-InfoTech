const paypal = require('paypal-rest-sdk');

// Configure PayPal SDK
paypal.configure({
    'mode': 'sandbox', // Change to 'live' in production
    'client_id': 'YOUR_CLIENT_ID',
    'client_secret': 'YOUR_CLIENT_SECRET'
});

// Controller function to initiate payment
const initiatePayment = (req, res) => {
    const { name, price } = req.body; // Extract booking details from request body

    // Create payment object
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success", // Replace with your actual success URL
            "cancel_url": "http://localhost:3000/cancel" // Replace with your actual cancel URL
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": name,
                    "sku": "001",
                    "price": price,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": price // Total amount to charge
            },
            "description": "Booking payment"
        }]
    };

    // Call PayPal API to create payment
    paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error initiating payment');
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    return res.redirect(payment.links[i].href); // Redirect user to PayPal approval URL
                }
            }
            return res.status(500).send('Approval URL not found');
        }
    });
};

// Controller function to handle payment success
const paymentSuccess = (req, res) => {
    // Implement logic to handle payment success
    res.send('Payment successful!');
};

// Controller function to handle payment cancellation
const paymentCancel = (req, res) => {
    // Implement logic to handle payment cancellation
    res.send('Payment cancelled.');
};

module.exports = {
    initiatePayment,
    paymentSuccess,
    paymentCancel
};
