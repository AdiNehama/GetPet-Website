const { OAuth2Client } = require('google-auth-library');
const UserSchema = require('../../models/UserSchema');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleSignIn = async (req, res) => {
  const { tokenId } = req.body;

  try {
    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userId = payload['sub']; // Extract user ID from payload

    // Check if user already exists in your database, or create a new user record if necessary

    // Generate access and refresh tokens
    const accessToken = jwt.sign({ userId }, process.env.SECRET_KEY_JWT, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN);

    // Save refresh token to user document (if needed)

    // Respond with tokens
    res.status(200).json({ accessToken, refreshToken, userId });
  } catch (error) {
    console.error('Google sign-in error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
