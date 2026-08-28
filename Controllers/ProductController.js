const Product = require('../Models/Products');
const { sendEmail } = require('../Middleware/emailsender');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        if (!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity || !req.body.color) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const { name, size, description, price, quantity, color } = req.body;

        const product = new Product({ name, size, description, price, quantity, color });

        await product.save();

        const subject = 'New Product Created';
        const text = `A new product has been created:\nName: ${name}\nSize: ${size}\nDescription: ${description}\nPrice: ${price}\nQuantity: ${quantity}\nColor: ${color}`;

        console.log('About to send email...');
        await sendEmail('subarugetsmails@gmail.com', subject, text);
        console.log('Email sent successfully!');

        return res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        return res.status(400).json({ message: 'Error creating product', error: error.message });
    }
};


// Create a product with image upload
exports.createProductWithImage = async (req, res) => {
    try {
        console.log('BODY:', req.body);
        console.log('FILE:', req.file);

        const { name, size, description, price, quantity, color } = req.body || {};

        if (!name || !size || !description || !price || !quantity || !color) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Image is required' });
        }

        console.log('Uploaded image:', req.file.path);

        const product = new Product({ name, size, description, price, quantity, color, image: req.file.path });

        await product.save();

        const subject = 'New Product Created';
        const text = `A new product has been created:\nName: ${name}\nSize: ${size}\nDescription: ${description}\nPrice: ${price}\nQuantity: ${quantity}\nColor: ${color}`;

        console.log('About to send email...');
        await sendEmail('subarugetsmails@gmail.com', subject, text, { filename: req.file.originalname, path: req.file.path });
        console.log('Email sent successfully!');

        return res.status(201).json({ message: 'Product created successfully and email notification sent', product });
    } catch (error) {
        return res.status(400).json({ message: 'Error creating product with image', error: error.message });
    }
};


// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { name, size, description, price, quantity, color } = req.body;
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(id, { name, size, description, price, quantity, color }, { new: true });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.json({ message: 'Product updated successfully', product });
    } catch (error) {
        return res.status(400).json({ message: 'Error updating product', error: error.message });
    }
};


// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        return res.json({ message: 'Products retrieved successfully', products });
    } catch (error) {
        return res.status(400).json({ message: 'Error retrieving products', error: error.message });
    }
};


// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.json({ message: 'Product retrieved successfully', product });
    } catch (error) {
        return res.status(400).json({ message: 'Error retrieving product', error: error.message });
    }
};


// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.json({ message: 'Product deleted successfully', product });
    } catch (error) {
        return res.status(400).json({ message: 'Error deleting product', error: error.message });
    }
};