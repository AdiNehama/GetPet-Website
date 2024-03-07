const UserSchema = require('../models/UserSchema');
const { validateUser } = require('./loginUtils');
const jwt = require('jsonwebtoken');
const passport = require('passport');


exports.login = async (req, res) => {
    //TODO: get the data fron the req object
    const { email, password } = req.body;
    const user = {
        email,
        password
    } 
    //TODO: check if the email and password are valid
    const validationResult = await validateUser(user, res);
    if (!validationResult) {
        // handle validation error
        console.error(validationResult.error);
        return;
    }
    console.log('valisation success');
    try {
        //get the user
    const existingUser = await UserSchema.findOne({ email });
    //get the user id
    const userId = existingUser._id;
    //generate tokens
    const accessToken = jwt.sign(
        { userId },
        process.env.SECRET_KEY_JWT,
        { expiresIn: '1h' }
    );
    const refreshToken =  jwt.sign(
        {userId}, 
        process.env.REFRESH_TOKEN
    );
    if(!existingUser.tokens?.length){
        existingUser.tokens = [refreshToken];
    }
    else{
        existingUser.tokens.push(refreshToken);
    }
    //save the user
    await existingUser.save();
    //send the tokens
    res.status(200).json({ accessToken, refreshToken });
    
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'Internal server error' });
        
    }
};
