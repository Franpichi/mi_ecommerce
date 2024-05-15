const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const ProductController = require('../controllers/productController');

// Endpoint para obtener todos los productos
router.get('/', ProductController.getAllProducts);

// Endpoint para agregar un nuevo producto
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    imageUrl: req.body.imageUrl,
    stock: req.body.stock
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint para actualizar un producto existente
router.put('/:productId', ProductController.updateProduct);

// Endpoint para eliminar un producto
router.delete('/:productId', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
