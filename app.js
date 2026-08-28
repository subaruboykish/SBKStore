require('dotenv').config();
const dotenv = require('dotenv');

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Password exists' : 'Password missing');


// Load environment variables BEFORE importing routes/config files
dotenv.config();

const express = require('express');
const connectDB = require('./Config/databaseConfig');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Import routes AFTER dotenv.config()
const productRoutes = require('./Routes/ProductRoute');
const userRoutes = require('./Routes/UserRoute');

// Routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
