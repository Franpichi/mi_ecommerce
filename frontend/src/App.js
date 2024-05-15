import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { NavigationProvider } from './contexts/NavigationContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import AdminPanel from './components/AdminPanel';
import SomePrivateComponent from './components/SomePrivateComponent';
import CheckoutForm from './components/CheckoutForm';
import PaymentStatus from './components/PaymentStatus'; // Asegúrate de importar PaymentStatus

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <Router>
      <NavigationProvider> 
        <CartProvider>
          <AuthProvider>
            <Header />
            <div className='content'>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/home" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/product" element={<ProductList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/register" element={<Register />} />
                <Route path="/checkout" element={
                  <Elements stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements>
                } />
                <Route path="/private" element={
                  <PrivateRoute>
                    <SomePrivateComponent />
                  </PrivateRoute>
                } />
                <Route path="/payment-status" element={<PaymentStatus />} />  // Ruta para PaymentStatus
              </Routes>
            </div>
            <Footer />
          </AuthProvider>
        </CartProvider>
      </NavigationProvider>
    </Router>
  );
}

export default App;
