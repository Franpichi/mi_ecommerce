/* import React, { useEffect, useState } from 'react';
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
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1
      }
    });
  };

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ minWidth: '200px', borderRight: '2px solid gray', padding: '10px' }}>
        <h3>Categories</h3>
        {categories.map(category => (
          <button className='button-28' key={category} onClick={() => setSelectedCategory(category)} style={{ display: 'block', margin: '5px 0' }}>
            {category}
          </button>
        ))}
      </div>
      <div className="flex-container" style={{ paddingLeft: '200px' }}>
        {filteredProducts.map(product => (
          <div key={product._id} className="product-item">
            <h3 className='title'>{product.name}</h3>
            <img src={product.imageUrl} alt={product.name} width="300" height="300" />
            <p>{product.description}</p>
            <button className='button-28' onClick={() => addToCart(product)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
 */

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
        id: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl, // Agregando la URL de la imagen
        quantity: 1
      }
    });
  };

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ minWidth: '200px', borderRight: '2px solid gray', padding: '10px' }}>
        <h3>Categories</h3>
        {categories.map(category => (
          <button className='button-28' key={category} onClick={() => setSelectedCategory(category)} style={{ display: 'block', margin: '5px 0' }}>
            {category}
          </button>
        ))}
      </div>
      <div className="flex-container" style={{ paddingLeft: '200px' }}>
        {filteredProducts.map(product => (
          <div key={product._id} className="product-item">
            <h3 className='title'>{product.name}</h3>
            <img src={product.imageUrl} alt={product.name} width="300" height="300" />
            <p>{product.description}</p>
            <button className='button-28' onClick={() => addToCart(product)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
