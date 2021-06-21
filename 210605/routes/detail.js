const express = require('express');
const mongoose = require('mongoose');
const Lecture = require('../schemas/lectures');
const User = require('../schemas/users');
const Comment = require('../schemas/comments');

var router = express.Router();

router.get('/', function(req, res, next) {
    const lec_num = req.query.lec_num;
    const user_id = req.session.user_id;

    if(req.session.user_id) logined = 1;
    else logined = 0 
    // console.log(lec_num);

    Lecture.findOne({lec_num: lec_num}, function(err, lecture){
        if(err) console.error(err);

        // console.log(lecture);

        Comment.find({lecture_id: lecture._id}, function(err, comments){
            if(err) console.error(err);

            if(comments){
                var sum = 0;

                for(var i=0; i<comments.length; i++){
                    sum = sum + comments[i].rating
                }
    
                average = Math.round((sum/comments.length) *10);
                average = average/10;

                res.render('detail',{lecture: lecture, comments:comments, logined:logined, average:average, user_id:user_id});
            }else{
                res.render('detail',{lecture: lecture, comments:0, logined:logined, average:0, user_id:user_id});
            }
        });
    });
})

module.exports = router;