const express = require('express');
const app = express();
const mongoose = require('mongoose');
const CookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

mongoose.connect('mongodb+srv://test:test@cluster0.ei5iy.mongodb.net/my_database', {
    useNewUrlParser: true,
});

const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    key:'session_id',
    secret:'knu_shopping',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAgd:24000*60*60,
        httpOnly:true
    }
}))

app.use(express.json());

global.user_id = null;
app.use("*", (req, res, next) => {
    user_id = req.session.user_id;
    next()
});

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup.js');
const basketRouter = require('./routes/basket.js');
const likeRouter = require('./routes/like.js');
const mypageRouter = require('./routes/mypage.js');
const logoutRouter = require('./routes/logout.js');
const DetailRouter = require('./routes/detail.js');
const CommentRouter = require('./routes/comment.js');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/basket', basketRouter);
app.use('/like', likeRouter);
app.use('/mypage', mypageRouter);
app.use('/logout', logoutRouter);
app.use('/detail', DetailRouter);
app.use('/comment', CommentRouter);

let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}
app.listen(port, () => { console.log('App listening on port 4000') })

app.use((req, res) => res.render('notfound'))