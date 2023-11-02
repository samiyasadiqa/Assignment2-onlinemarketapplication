const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.json({ message: err.message });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category
    });

    try {
        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (err) {
        res.json({ message: err.message });
    }
};

// Get a specific product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.json(product);
    } catch (err) {
        res.json({ message: err.message });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.updateOne(
            { _id: req.params.productId },
            { $set: req.body }
        );
        res.json(updatedProduct);
    } catch (err) {
        res.json({ message: err.message });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const removedProduct = await Product.remove({ _id: req.params.productId });
        res.json(removedProduct);
    } catch (err) {
        res.json({ message: err.message });
    }
};
