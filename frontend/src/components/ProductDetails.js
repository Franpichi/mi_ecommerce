import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { dispatch } = useCart();

  useEffect(() => {
    fetch('http://localhost:3001/api/products/:id') // Reemplaza :id con el ID real del producto
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
        id: product.id, // Reemplaza con el ID real del producto
        name: product.name,
        price: product.price,
        quantity: 1 // Por defecto, puedes cambiar si es necesario
      }
    });
  };

  return (
    <div>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <button onClick={addToCart}>Add to Cart</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetails;
