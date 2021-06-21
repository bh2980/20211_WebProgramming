const express = require('express');
const mongoose = require('mongoose');
const Lecture = require('../schemas/lectures');
const User = require('../schemas/users');
const Comment = require('../schemas/comments');

var router = express.Router();

router.get('/', function(req, res, next) {
    const user_id = req.session.user_id;
    const lec_num = req.query.lec_num;
    const review = req.query.comment;
    const star = Number(req.query.star);
    console.log(star);
    console.log(review);
    console.log(lec_num);
    console.log(user_id.length)

    User.findOne({id:user_id}, function(err, user){
        if(err) console.error(err);

        Lecture.findOne({lec_num:lec_num}, function(err, lecture){
            if(err) console.error(err);

            comment = new Comment({
                user_id : user_id,
                lecture_id : lecture._id,
                rating : Number(star),
                comment : review,
            })

            

            comment.save(function(err, comment){
                res.send("<script>alert('등록되었습니다.');location.href='"+req.rawHeaders[23]+"'</script>");
            })
        })
    })
})

router.get('/:comment_id', function(req, res, next) {
    const user_id = req.session.user_id;
    const comment_id = req.params.comment_id;

    Comment.findByIdAndDelete({_id:comment_id}, function(err, docs){
        if(err) console.error(err);

        console.log('삭제');

        res.send("<script>alert('삭제되었습니다.');location.href='"+req.rawHeaders[23]+"'</script>");
    })
})

module.exports = router;