const express = require('express');
const mongoose = require('mongoose');
const Lecture = require('../schemas/lectures');
const User = require('../schemas/users');
const Like = require('../schemas/likes');

var router = express.Router();

//메인페이지 로딩
router.get('/', function(req, res, next) {
    var session = req.session;
    var major = session.major;
    var concentration = session.concentration;

    // console.log(session.user_id);
    // console.log(session.major);
    // console.log(session.concentration);

    today = [];
    recommend = [];
    if(!major){
        // console.log("!major");
        Lecture.find({lec_method: '비대면'}, function(err, lectures){
        if(err) console.error(err);

        for(var i=0; i<5; i++){
            today[i] = lectures[Math.floor(Math.random()*lectures.length)];
            // console.log(today[i].lec_link);
        }

        Lecture.find({lec_cat:'교양'}, function(err, lectures){
            for(var i=0; i<10; i++){
                recommend[i] = lectures[Math.floor(Math.random()*lectures.length)];
            }

            res.render('index', {user_id : session.user_id, today : today, recommend});
        })

        //index를 rendering 하면서 index의 user_id 변수에 session_user_id 변수를 넣어줌
    })}
    else{
        // console.log("else");
        Lecture.find({$or:[{$and:[ {$or:[ {major:major}, {concentration:concentration} ]}, {lec_method: '비대면'} ]}, {$and:[ {lec_cat:'교양'}, {lec_method: '비대면'} ]}]}, function(err, lectures){
            if(err) console.error(err);

            for(var i=0; i<5; i++){
                today[i] = lectures[Math.floor(Math.random()*lectures.length)];
            }

            Lecture.find({lec_cat:'교양'}, function(err, lectures){
                for(var i=0; i<10; i++){
                    recommend[i] = lectures[Math.floor(Math.random()*lectures.length)];
                }

                res.render('index', {user_id : session.user_id, today : today, recommend});
            })
        })
    }
})

//검색
router.get('/search', function(req, res, next) {
    filter = req.query.filter;
    searching = req.query.searching.toUpperCase();
    page = 1;

    switch(filter){
        case 'all' : filter_name='전체';
            Lecture.find({$or: [{ name: { $regex:searching } },{ prefessor: { $regex:searching } },{ lec_num: { $regex:searching } },{ major: { $regex:searching } }, { concentration: {$regex:searching} } ] }, function(err, lectures){
                if(err) console.error(err);

                var prefessor = []

                for(var i=0; i<lectures.length; i++){
                    if(lectures[i].prefessor.length > 6) prefessor[i] = 0;
                    else prefessor[i] = lectures[i].prefessor;
                }
        
                res.render('search', {filter : filter_name, searching:req.query.searching, lectures:lectures, prefessor:prefessor, page});
            });
            break;

        case 'name' : filter_name='강의 제목'
            Lecture.find({name:{$regex:searching}}, function(err, lectures){
                if(err) console.error(err);

                var prefessor = []

                for(var i=0; i<lectures.length; i++){
                    if(lectures[i].prefessor.length > 6) prefessor[i] = 0;
                    else prefessor[i] = lectures[i].prefessor;
                }
        
                res.render('search', {filter : filter_name, searching:req.query.searching, lectures:lectures, prefessor:prefessor, page});
            });
            break;

        case 'professor' : filter_name='교수명'
            Lecture.find({prefessor:{$regex:searching}}, function(err, lectures){//오타났음
                if(err) console.error(err);
        
                var prefessor = []

                for(var i=0; i<lectures.length; i++){
                    if(lectures[i].prefessor.length > 6) prefessor[i] = 0;
                    else prefessor[i] = lectures[i].prefessor;
                }
        
                res.render('search', {filter : filter_name, searching:req.query.searching, lectures:lectures, prefessor:prefessor, page});
            });
            break;

        case 'lec_num' : filter_name='과목코드'
            Lecture.find({lec_num:{$regex:searching}}, function(err, lectures){
                if(err) console.error(err);
        
                var prefessor = []

                for(var i=0; i<lectures.length; i++){
                    if(lectures[i].prefessor.length > 6) prefessor[i] = 0;
                    else prefessor[i] = lectures[i].prefessor;
                }
        
                res.render('search', {filter : filter_name, searching:req.query.searching, lectures:lectures, prefessor:prefessor, page});
            });
            break;
            
        case 'major' : filter_name='전공'
            Lecture.find({$or:[{major:{$regex:searching}}, {concentration:{$regex:searching}}] }, function(err, lectures){
                if(err) console.error(err);
        
                var prefessor = []

                for(var i=0; i<lectures.length; i++){
                    if(lectures[i].prefessor.length > 6) prefessor[i] = 0;
                    else prefessor[i] = lectures[i].prefessor;
                }
        
                res.render('search', {filter : filter_name, searching:req.query.searching, lectures:lectures, prefessor:prefessor, page});
            });
            break;
    }
    
})

router.get('/category/:key', function(req, res, next) {
    const college = req.params.key;

    if (college == "inmun") var d = '인문대학';
    else if (college == "society") var d = '사회과학대학';
    else if (college == "nat") var d = '자연과학대학';
    else if (college == "cec") var d = '경상대학';
    else if (college == "law") var d = '법과대학';
    else if (college == "eng") var d = '공과대학';
    else if (college == "agri") var d = '농업생명과학대학';
    else if (college == "edu") var d = '사범대학';
    else if (college == "art") var d = '예술대학';
    else if (college == "doctor") var d = '의과대학';
    else if (college == "tooth") var d = '치과대학';
    else if (college == "animal") var d = '수의과대학';
    else if (college == "live") var d = '생활과학대학';
    else if (college == "free") var d = '자율전공부';
    else if (college == "nurs") var d = '간호대학';
    else if (college == "it") var d = 'IT대학';
    else if (college == "drug") var d = '약학대학';
    else if (college == "gov") var d = '행정학부';
    else if (college == "mix") var d = '융합학부';
    else if (college == "eco") var d = '생태환경대학';
    else if (college == "science") var d = '과학기술대학';

    Lecture.find({ college:d }, function(err, lectures){
        if(err) console.error(err);

        var prefessor = []

        for(var i=0; i<lectures.length; i++){
            if(lectures[i].prefessor.length > 6) prefessor[i] = 0;
            else prefessor[i] = lectures[i].prefessor;
        }

        res.render('category', {lectures : lectures, prefessor:prefessor, d:d});
    });
})

router.get('/category2/:key', function(req, res, next) {
    const key = req.params.key;

    Lecture.find({ lec_cat:key }, function(err, lectures){
        if(err) console.error(err);

        var prefessor = []

        for(var i=0; i<lectures.length; i++){
            if(lectures[i].prefessor.length > 6) prefessor[i] = 0;
            else prefessor[i] = lectures[i].prefessor;
        }

        res.render('category', {lectures : lectures, prefessor:prefessor, d});
    });
})

module.exports = router;