require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.engine('hbs', engine({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongoUrl: process.env.MONGO_URI })
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
app.post('/send-email', async (req, res) => {
  const { email, cartItems } = req.body;

  const message = {
    to: email,
    from: 'tu-email@example.com', // Reemplaza con tu email verificado en SendGrid
    subject: 'Compra exitosa',
    html: `
      <h1>Detalle de tu compra</h1>
      ${cartItems.map(item => `
        <div>
          <h3>${item.name}</h3>
          <img src="${item.imageUrl}" alt="${item.name}" style="width:100px;"/>
          <p>Precio: ${item.price}</p>
        </div>
      `).join('')}
    `
  };

  try {
    await sgMail.send(message);
    res.json({ success: true, message: 'Email enviado correctamente.' });
  } catch (error) {
    console.error('Error al enviar el email:', error);
    res.json({ success: false, message: 'Error al enviar el email.' });
  }
});

app.post('/api/payment', async (req, res) => {
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
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
