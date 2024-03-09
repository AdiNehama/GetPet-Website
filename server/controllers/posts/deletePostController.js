const PostSchema = require('../../models/PostSchema');

exports.DeletePost = async (req, res) => {
    var PostId = req.params.postId?.toString();
    
    if(PostId){
        try {
            const post = await PostSchema.findOneAndDelete(
                {_id: PostId}
            );

            res.status(200).json({ message: 'Success' })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};