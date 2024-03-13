const UserSchema = require('../../models/UserSchema');

exports.getOneUserById = async function (req, res) {
    var userId = req.params.userId?.toString();
    if (userId) {
        try {
            const user = await UserSchema.findOne({ _id: userId }); // Assuming userId is the _id field in your UserSchema
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

        return;
    }

    res.status(422).json({ error: 'Missing query params' });
};