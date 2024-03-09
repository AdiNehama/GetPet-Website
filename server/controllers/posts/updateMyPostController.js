const PostSchema = require('../../models/PostSchema');

exports.UpdateMyPost = async (req, res) => {
    var PostId = req.params.postId?.toString();
    
    if(PostId){
        try {
            const post = await PostSchema.findOneAndUpdate(
                {_id: PostId},
                req.body
            );

            res.status(200).json({ message: 'Success', post })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};