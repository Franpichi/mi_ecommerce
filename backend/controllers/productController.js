const Product = require('../models/Product');

exports.getAllProducts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const sortField = req.query.sortBy || 'name';
        const sortOrder = req.query.order || 'asc';

        let filter = {};

        if (req.query.category) {
            filter.category = req.query.category;
        }
        if (req.query.minPrice) {
            filter.price = { ...filter.price, $gte: parseInt(req.query.minPrice) };
        }
        if (req.query.maxPrice) {
            filter.price = { ...filter.price, $lte: parseInt(req.query.maxPrice) };
        }

        const products = await Product.find(filter)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit);

        res.json(products);
    } catch (error) {
        next(error);
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const { name, price, description, category, imageUrl, stock } = req.body;
        const product = new Product({
            name,
            price,
            description,
            category,
            imageUrl,
            stock
        });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const { name, price, description, category, imageUrl, stock } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            name,
            price,
            description,
            category,
            imageUrl,
            stock
        }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

// Eliminar un producto existente
exports.deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        next(error);
    }
};
