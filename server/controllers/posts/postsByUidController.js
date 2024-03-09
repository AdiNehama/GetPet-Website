const PostSchema = require('../../models/PostSchema');

exports.FetchPostsByUid = async (req, res) =>{
    var userId = req.params.userId?.toString();

    if (userId) {
        try {
            const posts = await PostSchema.find({ userId });
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

        return;
    }

    res.status(422).json({ error: 'Missing query params' });
};