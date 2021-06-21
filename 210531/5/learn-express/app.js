var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { LoopDetected } = require('http-errors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(function(req, res, next) {
    console.log(req.url, '저도 미들웨어입니다.');
    next(); //를 호출해야 다음 middle ware로 넘어감.
})

//콘솔에 로그를 남겨주는 기능
app.use(logger('dev'));

//정적파일 경로 제공
//정적 라우터 기능 제공 최대한 위에 배치
app.use(express.static(path.join(__dirname, 'public')));

//body-parser일부 기능 json 파일 전송 및 url encoded 주소 전송 방식
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//쿠키
app.use(cookieParser());
//express-session 모듈: session 관리용 cookieparser 뒤에 놓는 것을 추천
app.use(session({
    resave: false, //세션에 수정사항이 생기지 않더라도 다시 저장?
    saveUninitialized: false, //저장할 내역이 없더라고 저장? -> 방문자 추적용
    secret: 'secret code', //필수, cookie-parser 비밀키
    cookie: { //cookie 설정
        httpOnly: true,
        secure: false, //http's'에서만 사용?
    },
}));

//세션 아이디 확인 req.sessionID, 세션 한번에 삭제 req.session.destory()

//라우터
//첫번째 인자에 해당하는 주소에 대한 요청이 왔을 때만 실행
app.use('/', indexRouter); // '/'주소 요청이 왔을 때만 indexRouter(route/index) 실행
app.use('/users', usersRouter);
// app.get('/', function(req, res, next){
//   get메서드의 '/'일때만 실행
//   next();
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;