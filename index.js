const path = require('path');
const expressEdge = require('express-edge');
const express = require('express');
const edge = require("edge.js");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require("connect-flash");

const createPostController = require('./controllers/createPost');
const editPostController = require('./controllers/editPost');
const updatePostController = require('./controllers/updatePost');
const homePageController = require('./controllers/homePage');
const mailController = require('./controllers/mailController');
const viewPageController = require('./controllers/viewPage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const createUserController = require("./controllers/createUser");
const storeUserController = require('./controllers/storeUser');
const loginController = require("./controllers/login");
const loginUserController = require('./controllers/loginUser');
const logoutController = require("./controllers/logout");
const auth = require("./middleware/auth");

const app = new express();

mongoose.connect('mongodb://localhost:27017/node-blog', {
        useNewUrlParser: true
    })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err));

mongoose.set('debug', true);
const mongoStore = connectMongo(expressSession);

app.use(expressSession({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(fileUpload());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/ckeditor'));
app.use(express.static(__dirname + '/plugins'));
app.use('/posts', express.static(__dirname + '/public'));
app.use('/posts/edit', express.static(__dirname + '/public'));
app.use('/posts/update', express.static(__dirname + '/public'));
app.use('/post', express.static(__dirname + '/public'));
app.use('/auth', express.static(__dirname + '/public'));
app.use('/mail', express.static(__dirname + '/public'));
//app.use('/view/edit', express.static(__dirname + '/public'));

app.use(expressEdge);
app.use(connectFlash());
app.set('views', __dirname + '/views');

app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId)
    next()
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const storePost = require('./middleware/storePost');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')

app.get("/", homePageController);
app.post("/mail/mail", mailController);
app.get("/view/:page", viewPageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", auth, createPostController);
app.get("/posts/edit/:id", auth, editPostController);
app.post("/posts/update/:id", auth, updatePostController);
app.post("/posts/store", auth, storePost, storePostController);
app.get("/auth/login", redirectIfAuthenticated, loginController);
app.post("/users/login", redirectIfAuthenticated, loginUserController);
app.get("/auth/register", redirectIfAuthenticated, createUserController);
app.post("/users/register", redirectIfAuthenticated, storeUserController);
app.get("/auth/logout", logoutController);

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(4000, () => {
    console.log('App listening on port 4000');
});