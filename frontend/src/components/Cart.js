import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 

function Cart() {
  const { state, dispatch } = useCart();
  const { items } = state;
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalAmount = items.reduce((acc, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      console.log(`Item: ${item.name}, Price: ${price}, Quantity: ${quantity}, Image URL: ${item.imageUrl}`);
      return acc + (price * quantity);
    }, 0);
    console.log(`Total Amount: ${totalAmount}`);
    setTotal(totalAmount);
  }, [items]);

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  };

  const handleCheckout = () => {
    if (!user) {
      setIsModalOpen(true);
    } else {
      localStorage.setItem('cartItems', JSON.stringify(items));
      localStorage.setItem('cartTotal', JSON.stringify(total));
      navigate('/checkout');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="login-container">
      <h2 className='horologium-title'>Tu Carrito</h2>
      <p className='title'>Total: ${total.toFixed(2)}</p>
      <div className="login-form">
        {items.map((item, index) => (
          <div key={item.id || index} className="cart-item">
            <h4 className='title'>{item.name}</h4>
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.name} width="300" height="300" onError={(e) => e.target.style.display='none'} />
            ) : (
              <p>No hay imagen disponible</p>
            )}
            <p className='title'>Precio: ${item.price ? parseFloat(item.price).toFixed(2) : '0.00'} x {item.quantity || 0}</p>
            <button className="button-28" onClick={() => removeFromCart(item)}>Vaciar el Carrito</button>
          </div>
        ))}
      </div>
      {items.length > 0 ? (
        <div className="cart-actions">
          <Link to="/product">
            <button className="button-28">Seguir Comprando</button>
          </Link>
          <button className="button-28" onClick={handleCheckout}>Pasar al Pago</button>
        </div>
      ) : (
        <div className="empty-cart">
          <p>Tu carrito está vacío.</p>
          <Link to="/product">
            <button className="button-28">Volver a la tienda</button>
          </Link>
        </div>
      )}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>Debes iniciar sesión para proceder al pago.</p>
            <Link to="/login">
              <button className="button-28">Iniciar Sesión</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
