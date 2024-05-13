// userRoutes.js

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');

// Rutas para el registro y el inicio de sesión
router.post('/register', register);
router.post('/login', login);

module.exports = router;
