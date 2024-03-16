const UserSchema = require('../../models/UserSchema');
const { validateUser } = require('../../validation/loginUtils');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client();

exports.GoogleSignIn = async (req, res) => {
    const { credential, client_id } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: client_id,
        });
        const payload = ticket.getPayload();
        const email = payload['email'];
        //check if the user exist in the database
        const existingUser = await UserSchema.findOne({ email });
        //generate tokens
        const userId = existingUser._id;
        const accessToken = jwt.sign(
            { userId },
            process.env.SECRET_KEY_JWT,
            { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
            { userId },
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
        res.status(200).json({ accessToken, refreshToken, userId });

    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
