const PostSchema = require('../../models/PostSchema');

exports.FetchAllPosts = async (req, res) => {
    try {
        const posts = await PostSchema.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
