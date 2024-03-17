const PostSchema = require('../../models/PostSchema');

exports.getPostByPostId = async (req, res) => {
    var _id = req.params.postId?.toString();
    
    if(_id){
        try {
            const post = await PostSchema.findOne({ _id })
            .select('-comments.userId.tokens -comments.userId.password -comments.userId.phone -comments.userId.email')
            .populate({ 
                path: 'comments',
                populate: {
                  path: 'userId',
                  model: 'User',
                  select: '-password -tokens -phone -email'
                } 
             });

            res.status(200).json({ message: 'Success', post })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};