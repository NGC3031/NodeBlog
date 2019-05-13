const Post = require('../database/models/Post')

module.exports = async (req, res) => {
    const pagesDisplay = 10;
    const cat = req.query.category;
    const page = parseInt(await req.params.page);
    const pageNext = parseInt(page) + 1;
    const pageNext2 = parseInt(page) + 2;
    const pagePrevious = parseInt(page) - 1;
    if (typeof (cat) != 'undefined') {
        posts = await Post.find({
            category: cat
        }).sort({
            createdAt: -1
        }).skip((page - 1) * pagesDisplay).limit(pagesDisplay);
    } else {
        posts = await Post.find({}).sort({
            createdAt: -1
        }).skip((page - 1) * pagesDisplay).limit(pagesDisplay);
    }
    res.render("view", {
        posts,
        page,
        pageNext,
        pageNext2,
        pagePrevious
    });
}