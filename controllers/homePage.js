const Post = require('../database/models/Post')

module.exports = async (req, res) => {
    const posts = await Post.find({}).sort({
        createdAt: -1
    }).limit(10);

    const categories = await Post.find({
        category: "*"
    }).sort({}).limit(20);

    res.render("index", {
        posts,
        categories
    });
}