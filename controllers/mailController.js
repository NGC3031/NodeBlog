const path = require('path');
const Post = require('../database/models/Post');
var nodemailer = require('nodemailer');
module.exports = async (req, res) => {
    const posts = await Post.find({}).sort({
        createdAt: -1
    }).limit(10);

    const categories = await Post.find({
        category: "*"
    }).sort({}).limit(20);
    console.log('mailed');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ynot2718@gmail.com',
            pass: 'scottkd38'
        }
    });

    var mailOptions = {
        from: 'ynot2718@gmail.com',
        to: 'scottdouglass2000@yahoo.com.au',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.render("index", {
        posts,
        categories
    });
}