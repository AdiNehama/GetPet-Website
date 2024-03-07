//validation for the users
const bcrypt = require('bcrypt');
const UserSchema = require('../models/UserSchema');




//validation function
const validateUser = async (user, res) => {
    const { name, email, password, confirmPassword, phone, image } = user;
  // Validate user object
  if (!name || !email || !password || !confirmPassword || !phone || !image) {
    res.status(400).json({ message: 'All fields are required' });

    return false;
  }
  
// Check if user with the same email already exists
const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
     res.status(400).json({ error: 'Email is already registered' });

     return false;
    }

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: 'Invalid email format' });

      return false;
    }
  

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

    return true;
};
module.exports = validateUser;