const fs = require('fs');

//읽기
// fs.readFile('./readme.txt', (err, data) => {
//     if (err) {
//         throw err;
//     }
//     console.log(data);
//     console.log(data.toString());
// })

//쓰기
// fs.writeFile('./writeme.txt', '글이 입력됩니다.', (err) => {
//     if (err) {
//         throw err;
//     }
//     fs.readFile('./writeme.txt', (err, data) => {
//         if (err) {
//             throw err;
//         }
//         console.log(data.toString());
//     })
// })

//여러번 읽기
console.log('start');
//비동기 순서대로 읽지 않음
// fs.readFile('./readme.txt', (err, data) => {
//     if (err) throw err;
//     console.log('1번', data.toString());
// })

// fs.readFile('./readme.txt', (err, data) => {
//     if (err) throw err;
//     console.log('2번', data.toString());
// })

// fs.readFile('./readme.txt', (err, data) => {
//     if (err) throw err;
//     console.log('3번', data.toString());
// })

//동기 순서대로 읽음
// let data = fs.readFileSync('./readme.txt');
// console.log('1', data.toString());
// data = fs.readFileSync('./readme.txt');
// console.log('2', data.toString());
// data = fs.readFileSync('./readme.txt');
// console.log('3', data.toString());

//비동기 순서대로 콜백지옥
fs.readFile('./readme.txt', (err, data) => {
    if (err) throw err;
    console.log('1번', data.toString());

    fs.readFile('./readme.txt', (err, data) => {
        if (err) throw err;
        console.log('2번', data.toString());

        fs.readFile('./readme.txt', (err, data) => {
            if (err) throw err;
            console.log('3번', data.toString());
        })

    })
})

console.log('끝');