const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');

// Define the routes
router.post('/createuser', userController.createUser);

router.post('/loginuser', userController.loginUser);

router.put('/updateuser/:id', userController.updateUser);


// Export the router
module.exports = router;