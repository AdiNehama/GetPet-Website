var mongoose = require('mongoose');

const { Schema } = mongoose;

const FileSchema = new Schema({

    file: {
        type: String
    }
   
});