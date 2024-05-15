import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    imageUrl: '',
    stock: ''
  });

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleAddProduct = () => {
    fetch('http://localhost:3001/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
      .then(response => response.json())
      .then(data => {
        setProducts([...products, data]);
        setNewProduct({
          name: '',
          price: '',
          description: '',
          category: '',
          imageUrl: '',
          stock: ''
        });
      })
      .catch(error => console.error('Error adding product:', error));
  };

  const handleDeleteProduct = (productId) => {
    fetch(`http://localhost:3001/api/products/${productId}`, {
      method: 'DELETE'
    })
      .then(() => setProducts(products.filter(product => product._id !== productId)))
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div>
      <h2>Gestión de Productos</h2>
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={newProduct.name}
          onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={newProduct.price}
          onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newProduct.description}
          onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Categoría"
          value={newProduct.category}
          onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL de la Imagen"
          value={newProduct.imageUrl}
          onChange={e => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
        />
        <button onClick={handleAddProduct}>Agregar Producto</button>
      </div>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name}
            <button onClick={() => handleDeleteProduct(product._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <Link to="/admin-panel">
        <button>Volver al Panel de Administración</button>
      </Link>
    </div>
  );
}

export default ProductManagement;
