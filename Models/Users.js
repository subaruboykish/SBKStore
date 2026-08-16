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
    HasAdminAccess: { 
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['superadmin','salesperson'],
        default: 'salesperson'
    },

   
},
{ 
 timestamps: true}
); 

const User = mongose.model('User', UserSchema);

module.exports = User; // Export the User model