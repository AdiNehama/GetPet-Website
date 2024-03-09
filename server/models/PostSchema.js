var mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
    userId: {
        type: String
    },
    image:{
        type: String,
        required: true
    },
    kind:{
        type: String,
        required: true
    },
    birthDate:{
        type: String,
        required: true
    },
    about:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Post', PostSchema);