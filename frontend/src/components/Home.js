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
    <div>
      {products.map(product => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default Home;
