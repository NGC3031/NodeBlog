const Post = require('../database/models/Post')

module.exports = async (req, res) => {
    const post = await Post.findById(req.params.id);
    const posts = await Post.find({}).sort({
        createdAt: -1
    }).limit(10);
    res.render("post", {
        post,
        posts
    });
}