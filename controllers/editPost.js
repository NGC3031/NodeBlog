const Post = require('../database/models/Post')

module.exports = async (req, res) => {
    if (req.session.userId) {
        const post = await Post.findById(req.params.id);
        res.render("edit", {
            post
        });
    } else {
        res.redirect('/auth/login');
    }
}