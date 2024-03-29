const UserSchema = require('../../models/UserSchema');
const jwt = require('jsonwebtoken');

exports.refreshToken = async (req, res) => {
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];
    if (token == null) return res.status(401);
    jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) return res.status(403).json(err.message);
        const userId = user.userId;
        try {
            const user = await UserSchema.findById(userId);
            if (user == null) return res.status(403).send('invalid request');
            if (!user.tokens.includes(token)) {
                user.tokens = [];
                user.save();
                return res.status(403).send('invalid request');
            }
            //generate tokens
            const accessToken = jwt.sign(
                { userId },
                process.env.SECRET_KEY_JWT,
                { expiresIn: '1h' }
            );
            const refreshToken = jwt.sign(
                { userId },
                process.env.REFRESH_TOKEN
            );
            user.tokens[user.tokens.indexOf(token)] = refreshToken
            user.markModified('tokens');
            await user.save();
            res.status(200).json({ accessToken, refreshToken, userId });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    })
};

