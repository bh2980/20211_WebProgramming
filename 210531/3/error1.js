// setInterval(() => {
//     console.log('시작');
//     try {
//         throw new Error('서버를 고장내주마! 낄낄낄깔깔깔깔');
//     } catch (err) {
//         console.error(err);
//     }
// }, 1000);

// const fs = require('fs');

// setInterval(() => {
//     fs.unlink('./asdjkladas.js', (err) => {
//         if (err) {
//             console.error(err);
//         }
//     });
// }, 1000);

process.on('uncaughtException', (err) => {
    console.error("예기치 못한 에에에러러러", err);
});

setInterval(() => {
    throw new Error('daskldjasldkajsl');
}, 1000);

setInterval(() => {
    console.log('실행됩니다');
}, 2000);