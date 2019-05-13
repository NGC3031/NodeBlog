const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    content: String,
    tags: String,
    username: String,
    image: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Post = mongoose.model('Update', PostSchema);

module.exports = Post;

console.log('Update.js');