require('dotenv').config();  // Asegura que las variables de entorno desde `.env` son leídas
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('./models/Product');  // Asegúrate de que la ruta al modelo es correcta
const User = require('./models/User');        // Asume la ruta correcta al modelo de usuario
const bcrypt = require('bcryptjs');           // Necesario para hashear las contraseñas de los usuarios
const connectDB = require('./config/db');     // Asume que existe una función para conectar a DB

// Se asume que 'connectDB' maneja la conexión usando 'MONGO_URI' desde '.env'
connectDB();

const importData = async () => {
    try {
        // Limpieza de colecciones
        await Product.deleteMany();
        await User.deleteMany();

        // Carga de productos
        const productsData = fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf8');
        const products = JSON.parse(productsData);
        await Product.insertMany(products);
        console.log('Products Imported Successfully!');

        // Carga de usuarios
        const usersData = fs.readFileSync(path.join(__dirname, 'data', 'users.json'), 'utf8');
        const users = JSON.parse(usersData);
        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await User.create({ ...user, password: hashedPassword });
        }
        console.log('Users Imported Successfully!');

        process.exit();
    } catch (error) {
        console.error('Error with data import:', error);
        process.exit(1);
    }
};

importData();
