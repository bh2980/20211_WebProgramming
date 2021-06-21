var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' }); //render함수는 템플릿할때 사용
});

module.exports = router;