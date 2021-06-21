const express = require('express');
const mongoose = require('mongoose');
const User = require('../schemas/users');
const Like = require('../schemas/likes');
const crypto = require('crypto');
const { get } = require('./login');

var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('signup', {id_check_toggle:0});
})

router.post('/register', function(req, res, next) {
    var name = req.body.name;
    var id = req.body.id;
    var college = req.body.college;
    var major = req.body.major;
    var grade = req.body.grade;
    var studentId = req.body.studentId;
    var check_id = req.body.id_toggle;

    console.log(check_id);

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

            var like = new Like({
                user_id:user._id,
            })

            like.save(function(err, like){
                if(err) return console.error(err);
                console.dir(like);
            })
        })
    })
    res.redirect("/");
})

router.post('/delete', function(req, res, next) {
    var id = req.body.id;

    console.log(id);

    User.findOne({id : id}, function(err, user){
        if(err) console.error(err);

        console.log(user);
        Like.findOneAndDelete({user_id:user._id}, function(err, docs){
            if(err) console.error(err);

            User.findOneAndDelete({id:id}, function(err, user){
                if(err) console.error(err);

                console.log("Deleted Users");
            })

            res.redirect("/logout");
        })
    })
})

module.exports = router;