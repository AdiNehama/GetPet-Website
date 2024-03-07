const UserSchema = require('../models/UserSchema');
const bcrypt = require('bcrypt');


const validateUser = async (user, res) => {
    const {email, password} = user;

    if(!email || !password){
        res.status(400).json({message: 'All fields are required'});
        return false;
    }
    //check if the email exist in the database
    const existingUser = await UserSchema.findOne({ email });
    if (!existingUser) {
     res.status(400).json({ error: 'Email doesnt exist' });

     return false;
    }
    //compare the password
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
        res.status(400).json({ message: 'Invalid password' });

        return false;
    }
    return true;
}

module.exports = {
    validateUser
};
