const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    user: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('post', postSchema);