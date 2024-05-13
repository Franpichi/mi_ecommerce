import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { dispatch } = useCart();

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        const uniqueCategories = ['All', ...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addToCart = (product) => {
    if (!product) {
      console.error('Product is not available');
      return;
    }
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product._id, // Asegúrate de que el producto tenga un campo _id, o usa el campo correcto si es diferente
        name: product.name,
        price: product.price,
        quantity: 1 // Puedes ajustar la cantidad predeterminada si es necesario
      }
    });
  };

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ minWidth: '200px', borderRight: '1px solid gray', padding: '10px' }}>
        <h3>Categories</h3>
        {categories.map(category => (
          <button key={category} onClick={() => setSelectedCategory(category)} style={{ display: 'block', margin: '5px 0' }}>
            {category}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, padding: '10px' }}>
        {filteredProducts.map(product => (
          <div key={product._id} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
