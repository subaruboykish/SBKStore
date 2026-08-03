const mongose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongose.connect('mongodb://localhost/inventory');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);

    }
};

module.exports = connectDB;