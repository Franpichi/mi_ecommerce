const express = require('express');
const router = express.Router();
const { register, login, listUsers, updateUser, deleteUser } = require('../controllers/userController');

// Rutas para el registro y el inicio de sesión
router.post('/register', register);
router.post('/login', login);

// Obtener todos los usuarios
router.get('/', listUsers);

// Crear un nuevo usuario
router.post('/', register);

// Eliminar un usuario
router.delete('/:id', deleteUser);

// Actualizar el rol de un usuario
router.put('/:id', updateUser);

module.exports = router;
