//routes/productRoutes.js

const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// Endpoint para obtener todos los productos
router.get('/', ProductController.getAllProducts);

// Endpoint para agregar un nuevo producto
router.post('/', ProductController.createProduct);  // Cambiado de addProduct a createProduct

// Endpoint para actualizar un producto existente
router.put('/:productId', ProductController.updateProduct);

// Endpoint para eliminar un producto
router.delete('/:productId', ProductController.deleteProduct);

module.exports = router;
