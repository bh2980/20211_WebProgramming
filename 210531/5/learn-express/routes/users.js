var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) { // 너는 app.js와 합쳐져서 /users'/'로 get요청시
    res.send('respond with a resource');
});

module.exports = router;