const UserSchema = require('../../models/UserSchema');
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const validateUser = require('../../validation/updateValidation');

exports.UpdateUser = async (req, res) => {
    var userId = req.params.userId?.toString();
    const { name, email, password, confirmedPassword, phone, image } = req.body;
    // Check that the data is valid
    const user = {
        name,
        email,
        password,
        confirmedPassword,
        phone,
        image
    }
    const validationResult =  validateUser(user, res);
    if (!validationResult) {
        // handle validation error
        console.error(validationResult.error);

        return;
    }
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
        
    }
    
    var _id = new ObjectId(userId);
    console.log(_id);
    if (_id) {
        try {
            const user = await UserSchema.findOneAndUpdate(
                { _id: _id },
                req.body,
                { new: true } // Return the updated document
            );

            if (user) {
                res.status(200).json({ message: 'User updated successfully', user });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(422).json({ error: 'Missing userId parameter' });
    }
};
