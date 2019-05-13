const path = require('path')
const Post = require('../database/models/Post')

module.exports = async (req, res) => {
    if (req.session.userId) {
        // now do the update
        const {
            image
        } = req.files

        image.mv(path.resolve(__dirname, '..', 'public/posts', image.name));

        var update = {
            $set: {
                title: req.body.title,
                category: req.body.category,
                description: req.body.description,
                content: req.body.content,
                tags: req.body.tags,
                username: req.body.username,
                image: `/posts/${image.name}`,
                createdAt: new Date()
            }
        };
        var query = {
            _id: req.params.id
        };
        var data = {
            $set: req.body,
        };

        Post.findOneAndUpdate({
            "_id": req.params.id
        }, update, {
            new: true
        }, (err, r) => {
            if (err) {
                console.log(query + "Something wrong when updating data!");
            }
        })

        res.redirect('/');
    } else {
        res.redirect('/auth/login');
    }
}