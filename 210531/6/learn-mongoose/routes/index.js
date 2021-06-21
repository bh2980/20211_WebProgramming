var express = require('express');
var User = require('../schemas/users') //모듈 가져오기

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) { // '/'로 접속시 라우터
    User.find({}) //모든 사용자 로딩
        .then((users) => { //return된 users를
            res.render('mongoose', { users }); //mongoose.pug 렌더링할때 users 변수에 넣어준다.
        })
        .catch((err) => {
            console.error(err);
            next(err);
        })
});

module.exports = router;