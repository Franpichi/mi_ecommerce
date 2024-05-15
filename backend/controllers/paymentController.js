/* const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.processPayment = async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
      description: 'Descripción del producto',
      payment_method: req.body.paymentMethodId,
      confirm: true
    });

    // Suponiendo que la lógica para crear un ticket y guardarlo va aquí
    const ticket = {
      user: req.user.id,
      amount: req.body.amount,
      description: 'Descripción del producto',
      paymentStatus: 'Completed'
    };

    // Aquí se enviaría el email usando SendGrid
    const emailContent = {
      toEmail: req.user.email,  // Asegúrate de que el usuario tenga un email
      subject: 'Confirmación de compra',
      text: `Hola, tu pago por $${req.body.amount / 100} ha sido procesado exitosamente.`,
      html: `<strong>Hola, tu pago por $${req.body.amount / 100} ha sido procesado exitosamente.</strong>`
    };
    await sgMail.send(emailContent);

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
      ticket,
      message: 'Pago procesado y ticket generado exitosamente.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 */
/* 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  try {
    const { amount, paymentMethodId } = req.body;

    if (!amount || !paymentMethodId) {
      return res.status(400).json({ success: false, message: 'Amount and payment method ID are required.' });
    }

    // Crear el Intento de Pago con automatic_payment_methods habilitado
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      automatic_payment_methods: { enabled: true }, // Habilitar automatic_payment_methods
      // Agregar return_url para redireccionamiento en caso necesario
      return_url: 'http://localhost:3000/payment-status'
    });

    if (paymentIntent.status === 'requires_action') {
      return res.json({ success: true, requiresAction: true, clientSecret: paymentIntent.client_secret });
    } else if (paymentIntent.status === 'succeeded') {
      return res.status(200).json({ success: true, message: 'Payment processed successfully.' });
    } else {
      throw new Error('Payment did not complete successfully.');
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    return res.status(500).json({ success: false, message: 'Error processing payment: ' + error.message });
  }
};
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  const { paymentMethodId, amount, cart } = req.body;

  if (!paymentMethodId || !amount || amount <= 0 || !cart || !Array.isArray(cart)) {
    return res.status(400).json({ success: false, error: 'Datos de pago inválidos o faltantes.' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convertir a centavos
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
