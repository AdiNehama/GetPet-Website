const jwt = require('jsonwebtoken');
const env = require('dotenv');


const authenticate = async (req, res, next) => {
    authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.SECRET_KEY_JWT, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}


module.exports = authenticate;