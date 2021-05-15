const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
var express = require('express');
var mongoose = require('mongoose');

var app = express();

const parseCookies = (cookie = '') =>
    cookie
    .split(';')
    .map(v => v.split('='))
    .map(([k, ...vs]) => [k, vs.join('=')])
    .reduce((acc, [k, v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    }, {});

const session = {};

const uri = 'mongodb://127.0.0.1:27017/test';
var db = mongoose.connect(uri, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('Succesfully Connected!');
    }
});

var UserSchema = new mongoose.Schema({
    id: String, // 이름
    password: String, // 비밀번호
});

var Users = mongoose.model('test', UserSchema);

http.createServer((req, res) => {
        console.log(req.url);
        const cookies = parseCookies(req.headers.cookie);
        if (req.url.startsWith('/login')) {
            const { query } = url.parse(req.url);
            const { id } = qs.parse(query);
            const { password } = qs.parse(query);
            Users.findOne({ id: id, password: password }, (err, test) => {
                if (err) {
                    console.log('에러');
                    fs.readFile('./server4.html', (err, data) => {
                        if (err) {
                            throw (err);
                        }
                        res.end(data);
                    });
                } else if (test) {
                    console.log('찾음');
                    const expires = new Date();
                    expires.setMinutes(expires.getMinutes() + 5);
                    const randomInt = +new Date();
                    session[randomInt] = {
                        id,
                        expires,
                    };
                    res.writeHead(302, {
                        Location: '/',
                        'Set-Cookie': `session=${randomInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
                    });
                    res.end();
                } else {
                    console.log('없음');
                    fs.readFile('./server4.html', (err, data) => {
                        if (err) {
                            throw (err);
                        }
                        res.end(data);
                    });
                }
            });
        } else if (cookies.session && session[cookies.session].expires > new Date()) { // '/' + cookie.name
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`${session[cookies.session].id}님 안녕하세요`);
        } else { // '/' only
            fs.readFile('./server4.html', (err, data) => {
                if (err) {
                    throw (err);
                }
                res.end(data);
            });
        }
    })
    .listen(8081, () => {
        console.log('8081포트에서 서버 대기중 입니다!');
    })