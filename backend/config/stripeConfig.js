//config/stripeConfig.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = stripe;

// En un controlador, por ejemplo, en controllers/paymentController.js
const stripe = require('../config/stripeConfig');

exports.createCharge = async (req, res) => {
    try {
        const charge = await stripe.charges.create({
            amount: 1000, // Monto en centavos
            currency: 'usd',
            source: req.body.token,
            description: 'Descripción del cargo'
        });
        res.status(200).json(charge);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};
