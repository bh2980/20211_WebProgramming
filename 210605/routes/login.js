const express = require('express');
const mongoose = require('mongoose');
const User = require('../schemas/users');
const crypto = require('crypto');

var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login');
})

router.post('/match', function(req, res, next) {
    var id = req.body.id;
    var session = req.session;

    // console.log(id, password);

    User.findOne({id: id}, function(err, user){
        if(err) console.error(err);

        if(!user) {
            res.send("<script>alert('아이디가 존재하지 않거나 비밀번호가 다릅니다.');location.href='./'</script>");
        }
        else{
            salt = user.salt;
            crypto.pbkdf2(req.body.pwd, salt, 100000, 64, 'sha512', (err, key) =>{
                var password = key.toString('base64');

                if(password == user.password){
                    session.user_id = id;
                    session.major = user.major;
                    session.concentration = user.concentration;
    
                    res.redirect('/');
                }
                else{
                    res.send("<script>alert('아이디가 존재하지 않거나 비밀번호가 다릅니다.');location.href='./'</script>");
                }
            });
        };
    })
})

module.exports = router;