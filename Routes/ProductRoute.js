const express = require('express');
const router = express.Router();

// Import the product controller
const productController = require('../Controllers/ProductController');


// Define the routes
router.post('/createproduct', productController.createProduct);

router.put('/updateproduct/:id', productController.updateProduct);

router.get('/getallproducts', productController.getAllProducts);

router.get('/getproductbyid/:id', productController.getProductById);

router.delete('/deleteproduct/:id', productController.deleteProduct);   

// Export the router
module.exports = router;