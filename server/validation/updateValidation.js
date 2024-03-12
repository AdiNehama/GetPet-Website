//validation for the users
const bcrypt = require('bcrypt');
const UserSchema = require('../models/UserSchema');




//validation function
const validateUser = (user, res) => {
    const { name, email, password, confirmPassword, phone, image } = user;
    // Validate user object
    if (phone) {
        if (phone.length !== 10) {
            res.status(400).json({ message: 'phone incorrect' });

            return false;

        }
    }


    if (email) {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ message: 'Invalid email format' });

            return false;
        }
    }

    if (password) {
        //if the password and confirmation password are not the same return false
        if (password !== confirmPassword) {
            res.status(400).json({ message: 'Passwords do not match' });

            return false;
        }

        //if the password is too short the password need to be more then 6 cherecters
        if (password.length < 6) {
            res.status(400).json({ message: 'Password is too short' });

            return false;
        }
    }

    return true;
};
module.exports = validateUser;