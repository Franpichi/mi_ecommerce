const express = require('express');
const router = express.Router();
const { createUser, deleteUser, listUsers, createProduct, deleteProduct } = require('../controllers/adminController');
const isAdmin = require('../middleware/adminMiddleware');

router.post('/user', isAdmin, createUser);
router.delete('/user/:id', isAdmin, deleteUser);
router.get('/users', isAdmin, listUsers);
router.post('/product', isAdmin, createProduct);
router.delete('/product/:id', isAdmin, deleteProduct);

module.exports = router;
