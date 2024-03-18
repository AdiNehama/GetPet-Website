const PostSchema = require('../../models/PostSchema');

exports.PostNewComment = async (req, res) => {
    const { userId, content, postId } = req.body;
    const currentDate = req.body.currentDate;
    if (userId) {
        try {
            const post = await PostSchema.findById(postId);
            post.comments.push({ userId, currentDate, content });
            await post.save();
            res.status(201).json(post);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};