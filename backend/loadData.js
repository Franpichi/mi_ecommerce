require('dotenv').config(); 
const fs = require('fs');
const path = require('path');
const Product = require('./models/Product');  
const User = require('./models/User');       
const bcrypt = require('bcryptjs');          
const connectDB = require('./config/db');   

connectDB();

const importData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        const productsData = fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf8');
        const products = JSON.parse(productsData);
        await Product.insertMany(products);
        console.log('Products Imported Successfully!');

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
