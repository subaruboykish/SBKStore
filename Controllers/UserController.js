const User = require('../Models/Users');
const bcrypt = require('bcryptjs');

// CREATE USER
const createUser = async (req, res) => {
    try {
        const { name, email, password, gender, phone, role, HasAdminAccess } = req.body;

        // Validate request body
        if (!name || !email || !password || !gender || !phone) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        // Check if phone already exists
        const existingPhone = await User.findOne({ phone });

        if (existingPhone) {
            return res.status(400).json({
                message: 'Phone number already exists'
            });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            gender,
            phone,
            role: role || 'salesperson',
            HasAdminAccess: HasAdminAccess || false
        });

        await user.save();

        res.status(201).json({
            message: 'User created successfully',
            user
        });

    } catch (error) {
        res.status(400).json({
            message: 'Error creating user',
            error: error.message
        });
    }
};


// LOGIN USER
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Please provide all required fields'
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            });
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: 'Invalid password'
            });
        }

        // Generate token
        const jwt = require('jsonwebtoken');

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                name: user.name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.status(200).json({
            message: 'User logged in successfully',
            token,
            user
        });

    } catch (error) {
        res.status(400).json({
            message: 'Error logging in user',
            error: error.message
        });
    }
};

// UPDATE USER
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, gender, phone, role, HasAdminAccess } = req.body;

        const updateData = {
            name,
            email,
            gender,
            phone,
            role,
            HasAdminAccess
        };

        // Hash password if a new password is provided
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Don't send the password back in the response
        const userResponse = updatedUser.toObject();
        delete userResponse.password;

        res.status(200).json({
            message: 'User updated successfully',
            user: userResponse
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error updating user',
            error: error.message
        });
    }
};

// EXPORT FUNCTIONS
module.exports = {
    createUser,
    loginUser,
    updateUser
};







































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































