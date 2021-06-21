const express = require('express');
const session = require('express-session');
const User = require('../schemas/users');

var router = express.Router();

router.get('/', function(req, res, next) {
    var session = req.session;

    // console.log(session.user_id);

    User.findOne({id: session.user_id}, function(err, user){
        if(err) console.error(err);
        else{
            var name = user.name;
            var college = user.college;
            var major = user.major;
            var studentId = user.studentId;

            res.render('mypage', {user_id: session.user_id, name : name, college:college, major:major, studentId:studentId});
        };
    })
})

module.exports = router;