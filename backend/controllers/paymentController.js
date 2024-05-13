const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
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
