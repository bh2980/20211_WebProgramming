const express = require('express');

var router = express.Router();

router.get('/', function(req, res, next){
    req.session.destroy();
    res.clearCookie('session_id');

    res.redirect("/");
})

module.exports = router;