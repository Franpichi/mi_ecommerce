const express = require('express');
const router = express.Router();
const { register, login, listUsers, updateUser, deleteUser } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);

router.get('/', listUsers);

router.post('/', register);

router.delete('/:id', deleteUser);

router.put('/:id', updateUser);

module.exports = router;
