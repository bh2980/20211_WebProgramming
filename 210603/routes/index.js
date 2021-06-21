const express = require('express');
const mongoose = require('mongoose');
const Lecture = require('../schemas/lectures');

var router = express.Router();

//메인페이지 로딩
router.get('/', function(req, res, next) {
    var session = req.session;
    var major = session.major;
    var concentration = session.concentration;

    console.log(session.user_id);

    today = [];
    if(!major)
    {Lecture.find({lec_method: '비대면'}, function(err, lectures){
        if(err) console.error(err);

        for(var i=0; i<5; i++){
            today[i] = lectures[Math.floor(Math.random()*lectures.length)];
            // console.log(today[i].lec_link);
        }

        res.render('index', {user_id : session.user_id, today : today});
        //index를 rendering 하면서 index의 user_id 변수에 session_user_id 변수를 넣어줌
    })}
    else{
        Lecture.find({$or:[{$and:[ {$or:[ {major:major}, {concentration:concentration} ]}, {lec_method: '비대면'} ]}, {$and:[ {lec_cat:'교양'}, {lec_method: '비대면'} ]}]}, function(err, lectures){
            if(err) console.error(err);

            for(var i=0; i<5; i++){
                today[i] = lectures[Math.floor(Math.random()*lectures.length)];
            }
    
            res.render('index', {user_id : session.user_id, today : today});
        })
    }
})

//검색
router.get('/search', function(req, res, next) {
    filter = req.query.filter;
    searching = req.query.searching.toUpperCase();

    switch(filter){
        case 'all' : filter_name='전체';
            Lecture.find({$or: [{ name: { $regex:searching } },{ prefessor: { $regex:searching } },{ lec_num: { $regex:searching } },{ major: { $regex:searching } }, { concentration: {$regex:searching} } ] }, function(err, lectures){
                if(err) console.error(err);
        
                res.render('search', {filter : filter_name, searching:req.query.searching, lectures:lectures});
            });
            break;

        case 'name' : filter_name='강의 제목'
            Lecture.find({name:{$regex:searching}}, function(err, lectures){
                if(err) console.error(err);

                res.render('search', {filter : filter_name, searching:req.query.searching, lectures:lectures});
            });
            break;

        case 'professor' : filter_name='교수명'
            Lecture.find({prefessor:{$regex:searching}}, function(err, lectures){//오타났음
                if(err) console.error(err);
        
                res.render('search', {filter : filter_name, searching:req.query.searching, lectures:lectures});
            });
            break;

        case 'lec_num' : filter_name='과목코드'
            Lecture.find({lec_num:{$regex:searching}}, function(err, lectures){
                if(err) console.error(err);
        
                res.render('search', {filter : filter_name, searching:req.query.searching, lectures:lectures});
            });
            break;
            
        case 'major' : filter_name='전공'
            Lecture.find({$or:[{major:{$regex:searching}}, {concentration:{$regex:searching}}] }, function(err, lectures){
                if(err) console.error(err);
        
                res.render('search', {filter : filter_name, searching:req.query.searching, lectures:lectures});
            });
            break;
    }
    
})

module.exports = router;