const Product = require('../Models/Products'); 
 
//create a new product
exports.createProduct = async (req, res) => {
    try {

        //validate the request body
        if (!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity || !req.body.color) {
            return res.status(400).json({ message: 'All fields are required' });
        }   

        const { name, size, description, price, quantity, color } = req.body;

        const product = new Product({ name,size,description,price,quantity,color });

        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error: error.message });
    }   
};

//update a product
exports.updateProduct = async (req, res) => {
    try {
        const { name, size, description, price, quantity, color } = req.body;
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(
            id,
            { name, size, description, price, quantity, color },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error: error.message });
    }
};

//Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ message: 'Products retrieved successfully', products });
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving products', error: error.message });
    }
};  

//Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id); 

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product retrieved successfully', product });
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving product', error: error.message });
    }
};  

//Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully', product });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting product', error: error.message });
    }
};
