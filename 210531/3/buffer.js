// const buffer = Buffer.from('저를 버퍼로 바꿔보세요');
// console.log("from :", buffer);
// console.log('length : ', buffer.length);
// console.log('toString() : ', buffer.toString());

// const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')]
// console.log('noconcat : ', array);
// const buffer2 = Buffer.concat(array);
// console.log('huih : ', buffer2);
// console.log('concat : ', buffer2.toString());

// const buffer3 = Buffer.alloc(5);
// console.log('alloc :', buffer3);


//파일 나눠서 읽기 stream
const fs = require('fs');

// const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 });
// const data = [];

// readStream.on('data', (chunk) => {
//     data.push(chunk);
//     console.log('data : ', chunk, chunk.toString(), chunk.length);
// });

// readStream.on('end', () => {
//     console.log('end', Buffer.concat(data).toString(), Buffer.concat(data).length);
// })

// readStream.off('error', (err) => {
//     console.log('error : ', err);
// })

//파일 나눠서 쓰기 stream
// const writeStream = fs.createWriteStream('./writeme2.txt');
// writeStream.on('finish', () => {
//     console.log('파일 쓰기 완료');
// })

// writeStream.write('이 글을 한번 더 씁니다.\n');
// writeStream.write('한번 더 씁니다.');
// writeStream.end();

//stream 연결
const readStream = fs.createReadStream('readme4.txt');
const writeStream = fs.createWriteStream('write3.txt');
readStream.pipe(writeStream);