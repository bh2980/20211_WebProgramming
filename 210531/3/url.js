 const url = require('url');

 const URL = url.URL;
 const myURL = new URL('http://www.naver.com');
 console.log('new URL() : ', myURL);
 console.log('url.format:', url.format(myURL));
 console.log('---------------------------');
 const parseURL = url.parse('http://www.naver.com');
 console.log('url.parse() :', parseURL);
 console.log('url.format() : ', url.format(parseURL));