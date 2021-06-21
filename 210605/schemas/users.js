const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    id: String,
    password: String,
    college: String,
    major: String,
    grade: String,
    studentId: String,
    salt: String,
});

const User = mongoose.model('User', UserSchema);
//첫번째 인자를 컬렉션 이름으로 받음 이때 첫글자 소문자로 바꾸고 복수형으로 변경
//collection users와 userSchema가 연결

module.exports = User;