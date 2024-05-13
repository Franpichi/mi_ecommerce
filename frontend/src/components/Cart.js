/* import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const { state, dispatch } = useCart();
  const { items, total } = state;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura y cierre del modal

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  };

  const handleCheckout = () => {
    // Verificar si el usuario está autenticado aquí
    const isAuthenticated = true; // Cambiar por tu lógica real de autenticación

    if (!isAuthenticated) {
      // Si el usuario no está autenticado, abrir el modal
      setIsModalOpen(true);
    } else {
      // Si el usuario está autenticado, llevarlo a la página de pago
      navigate('/checkout');
    }
  };

  const closeModal = () => {
    // Función para cerrar el modal
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <p>Total: ${total ? total.toFixed(2) : '0.00'}</p>
      {items.map((item, index) => (
        <div key={item.id || index}>
          <h4>{item.name}</h4>
          <p>Price: ${item.price ? item.price.toFixed(2) : '0.00'} x {item.quantity || 0}</p>
          <button onClick={() => removeFromCart(item)}>Remove from Cart</button>
        </div>
      ))}
      {items.length > 0 ? (
        <div className="cart-actions">
          <Link to="/product">
            <button className="button">Seguir Comprando</button>
          </Link>
          <button className="button primary" onClick={handleCheckout}>Pasar al Pago</button>
        </div>
      ) : (
        <div>
          <p>Tu carrito está vacío.</p>
          <Link to="/product">
            <button className="button">Volver a la tienda</button>
          </Link>
        </div>
      )}
     /* {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>Debes iniciar sesión para proceder al pago.</p>
            <Link to="/login">
              <button className="button primary">Iniciar Sesión</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
 */
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Importamos el contexto de autenticación

function Cart() {
  const { state, dispatch } = useCart();
  const { items, total } = state;
  const navigate = useNavigate();
  const { user } = useAuth(); // Obtenemos el estado de autenticación
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura y cierre del modal

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  };

  const handleCheckout = () => {
    if (!user) {
      // Si el usuario no está autenticado, abrir el modal
      setIsModalOpen(true);
    } else {
      // Si el usuario está autenticado, llevarlo a la página de pago
      navigate('/checkout');
    }
  };

  const closeModal = () => {
    // Función para cerrar el modal
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <p>Total: ${total ? total.toFixed(2) : '0.00'}</p>
      {items.map((item, index) => (
        <div key={item.id || index}>
          <h4>{item.name}</h4>
          <p>Price: ${item.price ? item.price.toFixed(2) : '0.00'} x {item.quantity || 0}</p>
          <button onClick={() => removeFromCart(item)}>Remove from Cart</button>
        </div>
      ))}
      {items.length > 0 ? (
        <div className="cart-actions">
          <Link to="/product">
            <button className="button">Seguir Comprando</button>
          </Link>
          <button className="button primary" onClick={handleCheckout}>Pasar al Pago</button>
        </div>
      ) : (
        <div>
          <p>Tu carrito está vacío.</p>
          <Link to="/product">
            <button className="button">Volver a la tienda</button>
          </Link>
        </div>
      )}
      {/* Modal para mostrar el mensaje */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>Debes iniciar sesión para proceder al pago.</p>
            <Link to="/login">
              <button className="button primary">Iniciar Sesión</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
