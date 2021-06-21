const fs = require('fs');

//폴더 생성 파일 생성 파일 이름 변경
// fs.access('./folder', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => {
//     if (err) {
//         if (err.code === 'ENOENT') {
//             console.log('폴더 없음');
//             fs.mkdir('./folder', (err) => {
//                 if (err) throw err;

//                 console.log('폴더 만들기 성공');
//                 fs.open('./folder/file.js', 'w', (err, fd) => {
//                     if (err) throw err;
//                     fs.rename('./folder/file.js', './folder/newfile.js', (err) => {
//                         if (err) throw err;
//                         console.log('이름 바꾸기 성공');
//                     })
//                 })
//             })
//         }
//     } else {
//         console.log('폴더 있음');
//     }
// })

//폴더 내용 파일 및 폴더 삭제
// fs.readdir('./folder', (err, dir) => {
//     if (err) throw err;
//     console.log('폴더 내용 확인', dir);
//     fs.unlink('./folder/newFile.js', (err) => {
//         if (err) throw err;
//         console.log('파일 삭제 성공');
//         fs.rmdir('./folder', (err) => {
//             if (err) throw err;
//             console.log('폴더 삭제 성공');
//         });
//     });
// });

//파일 복사
fs.copyFile('readme4.txt', 'write4.txt', (error) => {
    if (error) {
        return console.error(error);
    }
    console.log('복사 완료');
})