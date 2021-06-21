const express = require('express');
const mongoose = require('mongoose');
const User = require('../schemas/users');
const crypto = require('crypto');
const { get } = require('./login');

var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('signup');
})

router.post('/register', function(req, res, next) {
    var name = req.body.name;
    var id = req.body.id;
    var college = req.body.college;
    var major = req.body.major;
    var grade = req.body.grade;
    var studentId = req.body.studentId;

    crypto.randomBytes(64, (err, buf) =>{
        var salt = buf.toString('base64');
        crypto.pbkdf2(req.body.pwd, salt, 100000, 64, 'sha512', (err, key) =>{
            var password = key.toString('base64');

            var user = new User({
                name: name,
                id: id,
                password: password,
                college: college,
                major: major,
                grade: grade,
                studentId: studentId,
                salt : salt
            });
        
            user.save(function(err, user){
                if(err) return console.error(err);
                console.dir(user);
            });
        })
    })

    res.redirect("/");
})

module.exports = router;