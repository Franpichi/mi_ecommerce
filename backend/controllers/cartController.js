// controllers/cartController.js
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        res.render('cart', { cart, title: 'Your Cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error getting the cart', error: error.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [], total: 0 });
        }

        const itemIndex = cart.items.findIndex(item => item.product.equals(productId));

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        cart.total += product.price * quantity;
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error: error.message });
    }
};
