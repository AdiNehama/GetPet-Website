const UserSchema = require('../../models/UserSchema');
const jwt = require('jsonwebtoken');

exports.logout = async (req, res, next) => {
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
            user.tokens.splice(user.tokens.indexOf(token),1);
            user.markModified('tokens');
            await user.save();
            res.status(200).send("success");
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    })
}
