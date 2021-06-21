const express = require('express');
const session = require('express-session');
const User = require('../schemas/users');

var router = express.Router();

router.get('/', function(req, res, next) {
    var session = req.session;

    // console.log(req.params.lec_num);
    if(session.user_id){
        User.findOne({id: session.user_id}, function(err, user){
        if(err) console.error(err);
        else{
            res.render('mypage', {user});
        };
    })
    }else{
        res.send("<script>alert('로그인 후 이용 가능합니다.');location.href='"+req.rawHeaders[23]+"'</script>");
    }
})

module.exports = router;