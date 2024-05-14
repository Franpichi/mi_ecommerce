import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';

function Home() {
  const [products, setProducts] = useState([]);
  const { dispatch } = useCart();

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addToCart = (product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: product
    });
  };

  return (
      <div className="flex-container" style={{ paddingLeft: '120px' }}>
      {products.map(product => (
        <div key={product._id} className="product-item">
          <h3 className='title'>{product.name}</h3>
          <img src={product.imageUrl} alt={product.name} width="300" height="300" />
          <p>{product.description}</p>
          <button className='button-28' onClick={() => addToCart(product)}>Agregar al carrito</button>
        </div>
      ))}
    </div>
  );
}

export default Home;
