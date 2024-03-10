const bcrypt = require('bcrypt');
const User = require('../../models/UserSchema');
const validateUser = require('../../validation/util');


// Controller function to handle user registration
exports.registerUser = async (req, res) => {
    // Get the data from the request object.
    const { name, email, password, confirmPassword, phone, image } = req.body;
    // Check that the data is valid
    const user = {
        name,
        email,
        password,
        confirmPassword,
        phone,
        image
    }
    const validationResult = await validateUser(user, res);

    if (!validationResult) {
        // handle validation error
        console.error(validationResult.error);

        return;
    }

    // Encrypt the password before sending it to the database.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the data to the DB.
    try {
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            image,

        });
        await newUser.save();
        //success message
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ error: 'Internal server error' });

    }
};

