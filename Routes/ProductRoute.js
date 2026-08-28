const express = require('express');
const { protect } = require('../Middleware/auth');
const { authorize } = require('../Middleware/role');

const productController = require('../Controllers/ProductController');
const upload = require('../Middleware/upload');

const router = express.Router();

router.post('/createproduct',protect,authorize('superadmin'),productController.createProduct);

router.post('/createproductwithimage',protect,upload.single('image'),productController.createProductWithImage);


router.put('/updateproduct/:id', protect, authorize('superadmin'), productController.updateProduct);
router.get('/getallproducts', productController.getAllProducts);
router.get('/getproductbyid/:id', productController.getProductById);
router.delete('/deleteproduct/:id', protect, authorize('superadmin'), productController.deleteProduct);   

// Export the router
module.exports = router;