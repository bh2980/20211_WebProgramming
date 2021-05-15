const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');

const app = new express()
app.use(bodyParser.urlencoded({ extended: true }));
const ejs = require('ejs')
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('login');
})

app.get('/signup', (req, res) => {
    res.render('signup');
})

app.get('/result', (req, res) => {
    res.render('result');
})

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

const Account = require('./models/CreateAccount')

app.post('/signup', (req, res) => {
    var title = req.body['id'];
    var pw = req.body['password'];

    Account.create({
        id: title,
        password: pw
    }, (error, account) => {
        console.log(error, account)
    })

    res.send("POST" + title + pw);
});

app.listen(4000, () => {
    console.log('App listening on port 4000')
})