const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/databaseConfig');
const app = express();

const productRoutes = require('./Routes/ProductRoute');
const userRoutes = require('./Routes/UserRoute');

dotenv.config(); // Load environment variables from .env file
connectDB(); // Connect to the database

app.use(express.json()); // Middleware to parse JSON request bodies


app.use('/products', productRoutes); //use the product routes for all requests starting with /products
app.use('/users', userRoutes); //use the user routes for all requests starting with /users

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
