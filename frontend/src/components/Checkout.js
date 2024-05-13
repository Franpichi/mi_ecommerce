import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import dotenv from 'dotenv';

dotenv.config();

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function Checkout() {
  const { state: cartState } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [address, setAddress] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleCheckout = async () => {
    setProcessing(true);
    try {
      const response = await fetch('/api/orders/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ items: cartState.items, total: cartState.total, address })
      });
      const data = await response.json();
      if (data.success) {
        alert('Order placed successfully!');
      } else {
        alert('Checkout failed!');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout error!');
    }
    setProcessing(false);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      <button onClick={handleCheckout} disabled={processing}>
        {processing ? 'Processing...' : 'Place Order'}
      </button>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default Checkout;
