var express = require('express');
var User = require('../schemas/users')

var router = express.Router();

// /user로 들어옴.

/* GET users listing. */
router.get('/', function(req, res, next) { //사용자 조회
    User.find({})
        .then((users) => {
            res.json(users); //users data를 json 형식으로 반환
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});


router.post('/', function(req, res, next) { //사용자 등록
    const user = new User({ //user 객체를 만들고
        name: req.body.name, //안에 들어갈 내용 정리
        age: req.body.age,
        married: req.body.married,
    });
    user.save() //위에서 지정한 user를 저장
        .then((result) => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch((err) => { //스키마에 부합하지 않으면 error 발생.
            console.error(err);
            next(err);
        });
});

module.exports = router;