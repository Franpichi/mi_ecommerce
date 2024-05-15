const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  const { paymentMethodId, amount, cart } = req.body;

  if (!paymentMethodId || !amount || amount <= 0 || !cart || !Array.isArray(cart)) {
    return res.status(400).json({ success: false, error: 'Datos de pago inválidos o faltantes.' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), 
      currency: 'usd',
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true
    });

    if (paymentIntent.status === 'requires_action') {
      res.json({ success: true, requiresAction: true, clientSecret: paymentIntent.client_secret });
    } else if (paymentIntent.status === 'succeeded') {
      res.status(200).json({ success: true, message: 'Pago procesado correctamente.' });
    } else {
      throw new Error('El pago no se completó exitosamente.');
    }
  } catch (error) {
    console.error('Error al procesar el pago:', error);
    res.status(500).json({ success: false, error: 'Error al procesar el pago. ' + error.message });
  }
};
