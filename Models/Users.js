const mongose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },   
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum ['user', 'admin'],
        default: 'user'
    }

    timestamps: true
}); 