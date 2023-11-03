const Product = require('../models/Product');

module.exports = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            await User.create({ name, email, password });
            res.json({ message: 'User registered successfully' });
        } catch (err) {
            res.status(400).json({ error: 'Registration failed' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                where: {
                    email: email
                }
            });
            res.json({ message: "Welcome To Login Page" })

        } catch (err) {
            res.status(500).json({ error: 'Authentication failed' });
        }
    },

    adminDashboard: (req, res) => {
        // This endpoint doesn't require authentication, and anyone can access it
        res.status(200).json({ message: 'Welcome to the admin dashboard' });
    }
    ,

    getProducts: async (req, res) => {
        try {
            const products = await Product.findAll();
            res.json(products);
        } catch (err) {
            res.status(500).json({ error: 'Error fetching products' });
        }
    },

    getProductById: async (req, res) => {
        const productId = req.params.id;
        try {
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (err) {
            res.status(500).json({ error: 'Error fetching product' });
        }
    },

    createProduct: async (req, res) => {
        const { name, price, description } = req.body;

        try {
            const product = await Product.create({ name, price, description });
            console.log(product)
            res.status(201).json(product);

        } catch (err) {
            res.status(400).json({ error: 'Invalid product data' });
        }
    },

    updateProduct: async (req, res) => {
        const productId = req.params.id;
        const { name, price, description } = req.body;

        try {
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            product.name = name;
            product.price = price;
            product.description = description;
            await product.save();

            res.json(product);
        } catch (err) {
            res.status(500).json({ error: 'Error updating product' });
        }
    },

    deleteProduct: async (req, res) => {
        const productId = req.params.id;

        try {
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            await product.destroy();
            res.json({ message: 'Product deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Error deleting product' });
        }
    },
};
