const mongose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongose.Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,   
        required: true  
    },
    description: {
        type: String,
        required: true      
    },
    price: {
        type: Number,
        required: true  
    }, 
    quantity: {
        type: Number,
        required: true  
    },

    timestamps: true    

})

const Product = mongose.model('Product', productSchema);