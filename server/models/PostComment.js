var mongoose = require('mongoose');

const { Schema } = mongoose;

const PostCommentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    date:{
        type: String
    },
    content: {
        type: String
    }
});

module.exports = PostCommentSchema;