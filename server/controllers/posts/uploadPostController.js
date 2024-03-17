const PostSchema = require('../../models/PostSchema');

exports.UploadPost = async (req, res, next) => {
    const { image, ownerName, kind, birthDate, about, phone, location, userId } = req.body;
    if (userId) {
        try {
            const post = new PostSchema({ image, ownerName, kind, birthDate, about, phone, location, userId, comments: [] });
            await post.save();
            res.status(201).json(post);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};