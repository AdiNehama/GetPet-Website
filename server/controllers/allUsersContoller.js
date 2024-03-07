const UserSchema = require('../models/UserSchema');

exports.FetchAllUsers = async (req, res) => {
    try {

        const users = await UserSchema.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



