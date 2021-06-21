const express = require('express');
const mongoose = require('mongoose');
const Lecture = require('../schemas/lectures');
const Like = require('../schemas/likes');
const User = require('../schemas/users');

var router = express.Router();

router.get('/', function(req, res, next) {
    var session = req.session;

    // console.log('like');
    if(session.user_id){
        User.findOne({id: session.user_id}, function(err, user){
            if(err) console.error(err);
            Like.findOne({user_id:user._id}, function(err, like){
                // console.log(like);
                Lecture.find({_id:like.like_list}, function(err, lectures){
                    // console.log(lectures);

                    var prefessor = []

                    for(var i=0; i<lectures.length; i++){
                        if(lectures[i].prefessor.length > 6) prefessor[i] = 0;
                        else prefessor[i] = lectures[i].prefessor;
                    }

                    res.render('like', {lectures: lectures, prefessor:prefessor})
                })
            })
        })
    }else{
        res.send("<script>alert('로그인 후 이용 가능합니다.');location.href='"+req.rawHeaders[23]+"'</script>");
    }
})

router.get('/:lec_num', function(req, res, next) {
    //query ? params /
    const lec_num = req.params.lec_num;
    var session = req.session;

    // console.log(req.params.lec_num);
    // console.log('likelist');

    if(session.user_id){
        User.findOne({id: session.user_id}, function(err, user){
            if(err) console.error(err);

            // console.log(user._id);

            Lecture.findOne({lec_num:lec_num}, function(err, lecture){
                if(err) console.error(err);

                Like.findOneAndUpdate({user_id:user._id},{"$addToSet":{"like_list":lecture._id}}, function(err, like){
                    if(err) console.error(err);

                    // console.log(like);
                    res.send("<script>alert('찜 리스트에 담았습니다.');location.href='"+req.rawHeaders[23]+"'</script>");
                })
            })
        })
    }else{
        res.send("<script>alert('로그인 후 이용 가능합니다.');location.href='"+req.rawHeaders[23]+"'</script>");
    }
})

router.get('/delete/:lec_num', function(req, res, next) {
    //query ? params /
    const lec_num = req.params.lec_num;
    var session = req.session;

    // console.log(lec_num);
    // console.log('likelist');

    if(session.user_id){
        User.findOne({id: session.user_id}, function(err, user){
            if(err) console.error(err);

            // console.log(user._id);

            Lecture.findOne({lec_num:lec_num}, function(err, lecture){
                if(err) console.error(err);

                // console.log(lecture)

                Like.findOneAndUpdate({user_id:user._id},{"$pull":{"like_list":lecture._id}}, function(err, like){
                    if(err) console.error(err);

                    // console.log(like);
                    res.send("<script>alert('"+lecture.name+"을(를) 찜 리스트에서 삭제했습니다.');location.href='"+req.rawHeaders[23]+"'</script>");
                })
            })
        })
    }else{
        res.send("<script>alert('로그인 후 이용 가능합니다.');location.href='"+req.rawHeaders[23]+"'</script>");
    }
})

module.exports = router;