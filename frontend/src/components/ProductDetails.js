import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { dispatch } = useCart();

  useEffect(() => {
    fetch('http://localhost:3001/api/products/:id') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product details:', error));
  }, []);

  const addToCart = () => {
    if (!product) {
      console.error('Product is not available');
      return;
    }
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1 
      }
    });
  };

  return (
    <div>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <button onClick={addToCart}> to Cart</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetails;
