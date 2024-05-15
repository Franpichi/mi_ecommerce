/* import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../contexts/CartContext';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { state: cartState } = useCart();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded yet.');
      setLoading(false);
      return;
    }

    if (!cartState.items || cartState.items.length === 0) {
      alert('Your cart is empty.');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('Payment error:', error.message);
      alert('Payment error: ' + error.message);
      setLoading(false);
      return;
    }

    const totalAmount = cartState.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    if (totalAmount <= 0) {
      alert('The total amount is invalid. Please check your cart items.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount: totalAmount, cart: cartState.items })
      });

      const responseData = await response.json();
      setLoading(false);

      if (responseData.success) {
        alert('Payment successful!');
      } else {
        alert('Payment failed: ' + responseData.error);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment error: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>{loading ? 'Processing...' : 'Pay'}</button>
    </form>
  );
};

export default CheckoutForm;

 */



















/* import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom'; 

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { state: cartState, dispatch } = useCart(); // Asegúrate de importar dispatch
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded yet.');
      setLoading(false);
      return;
    }

    if (!cartState.items || cartState.items.length === 0) {
      alert('Your cart is empty.');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('Payment error:', error.message);
      alert('Payment error: ' + error.message);
      setLoading(false);
      return;
    }

    const totalAmount = cartState.items.reduce((acc, item) => acc + (item.price * 100 * item.quantity), 0);
    if (totalAmount <= 0) {
      alert('The total amount is invalid. Please check your cart items.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount: totalAmount, cart: cartState.items })
      });

      const responseData = await response.json();
      setLoading(false);

      if (responseData.success) {
        dispatch({ type: 'CLEAR_CART' });  // Vacía el carrito después de un pago exitoso
        navigate('/payment-status', { state: { success: true } });
      } else {
        navigate('/payment-status', { state: { success: false } });
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment error: ' + error.message);
      setLoading(false);
      navigate('/payment-status', { state: { success: false } });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>{loading ? 'Processing...' : 'Pay'}</button>
    </form>
  );
};

export default CheckoutForm;
 */


/* import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom'; 

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { state: cartState, dispatch } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded yet.');
      setLoading(false);
      return;
    }

    if (!cartState.items || cartState.items.length === 0) {
      alert('Your cart is empty.');
      setLoading(false);
      return;
    }

    const totalAmount = cartState.items.reduce((acc, item) => {
      const price = Number(item.price);
      const quantity = Number(item.quantity);

      if (isNaN(price) || isNaN(quantity)) {
        console.error('Invalid price or quantity:', item);
        return acc; // Continúa sin añadir al acumulador si hay un error
      }

      return acc + (price * 100 * quantity);
    }, 0);

    if (isNaN(totalAmount) || totalAmount <= 0) {
      alert('The total amount is invalid. Please check your cart items.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount: totalAmount, cart: cartState.items })
      });

      const responseData = await response.json();
      setLoading(false);

      if (responseData.success) {
        dispatch({ type: 'CLEAR_CART' });
        navigate('/payment-status', { state: { success: true } });
      } else {
        navigate('/payment-status', { state: { success: false } });
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment error: ' + error.message);
      setLoading(false);
      navigate('/payment-status', { state: { success: false } });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>{loading ? 'Processing...' : 'Pay'}</button>
    </form>
  );
};

export default CheckoutForm;
 */
// CheckoutForm.js
/* 
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom'; 

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { state: cartState, dispatch } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded yet.');
      setLoading(false);
      return;
    }

    if (!cartState.items || cartState.items.length === 0) {
      alert('Your cart is empty.');
      setLoading(false);
      return;
    }

    const totalAmount = cartState.items.reduce((acc, item) => {
      const price = Number(item.price);
      const quantity = Number(item.quantity);

      if (isNaN(price) || isNaN(quantity)) {
        console.error('Invalid price or quantity:', item);
        return acc; // Continúa sin añadir al acumulador si hay un error
      }

      return acc + (price * 100 * quantity);
    }, 0);

    if (isNaN(totalAmount) || totalAmount <= 0) {
      alert('The total amount is invalid. Please check your cart items.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount, cart: cartState.items })
      });

      const responseData = await response.json();
      setLoading(false);

      if (responseData.success) {
        dispatch({ type: 'CLEAR_CART' });
        navigate('/payment-status', { state: { success: true } });
      } else {
        navigate('/payment-status', { state: { success: false } });
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment error: ' + error.message);
      setLoading(false);
      navigate('/payment-status', { state: { success: false } });
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <CardElement options={cardElementOptions} />
      <button className='button-27' type="submit" disabled={!stripe || loading}>{loading ? 'Processing...' : 'Pagar'}</button>
    </form>
  );
};

export default CheckoutForm;
 */
/* 
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom'; 

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { state: cartState, dispatch } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded yet.');
      setLoading(false);
      return;
    }

    if (!cartState.items || cartState.items.length === 0) {
      alert('Your cart is empty.');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      alert('Error creating payment method: ' + error.message);
      setLoading(false);
      return;
    }

    const totalAmount = cartState.items.reduce((acc, item) => {
      const price = Number(item.price);
      const quantity = Number(item.quantity);

      if (isNaN(price) || isNaN(quantity)) {
        console.error('Invalid price or quantity:', item);
        return acc; // Continúa sin añadir al acumulador si hay un error
      }

      return acc + (price * 100 * quantity);
    }, 0);

    if (isNaN(totalAmount) || totalAmount <= 0) {
      alert('The total amount is invalid. Please check your cart items.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount, paymentMethodId: paymentMethod.id, cart: cartState.items })
      });

      const responseData = await response.json();
      setLoading(false);

      if (responseData.success) {
        dispatch({ type: 'CLEAR_CART' });
        navigate('/payment-status', { state: { success: true } });
      } else {
        navigate('/payment-status', { state: { success: false } });
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment error: ' + error.message);
      setLoading(false);
      navigate('/payment-status', { state: { success: false } });
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <CardElement options={cardElementOptions} />
      <button className='button-27' type="submit" disabled={!stripe || loading}>{loading ? 'Processing...' : 'Pagar'}</button>
    </form>
  );
};

export default CheckoutForm;
 */


import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartTotal = localStorage.getItem('cartTotal');
    const cartItems = localStorage.getItem('cartItems');
    if (cartTotal && cartItems) {
      setTotal(JSON.parse(cartTotal));
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      toast.error("Stripe.js has not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount: total, cart: cartItems })
    });

    const paymentResponse = await response.json();

    if (paymentResponse.success) {
      toast.success("Payment successful!");
      navigate('/payment-status');
    } else {
      toast.error(paymentResponse.error || "Payment failed");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button className="button-28" type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default CheckoutForm;
