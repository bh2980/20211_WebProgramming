const express = require('express');
const mongoose = require('mongoose');
const Lecture = require('../schemas/lectures');
const Like = require('../schemas/likes');

var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('basket')
})

module.exports = router;