const User = require('../models/User');
const Product = require('../models/Product');

exports.listUsers = async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
};

exports.createUser = async (req, res) => {
    const { email, password, role = 'user' } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const newUser = new User({ email, password, role });
        await newUser.save();
        res.status(201).json({ success: true, message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    const { name, price, description } = req.body;
    try {
        const newProduct = new Product({ name, price, description });
        await newProduct.save();
        res.status(201).json({ success: true, message: "Product created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
};
