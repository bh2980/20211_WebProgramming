const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LectureSchema = new Schema({
    college: String,
    major: String,
    concentration: String,
    grade: String,
    lec_cat: String,
    lec_num: String,
    lec_link: String,
    name: String,
    grades: String,
    theory: String,
    training: String,
    prefessor: String,//오타남
    time: String,
    real_time: String,
    lec_room: String,
    students: String,
    sugang: String,
    supang_pack: String,
    pack_yes: String,
    etc: String,
    lec_method: String,
});

const Lecture = mongoose.model('Lecture', LectureSchema);
//첫번째 인자를 컬렉션 이름으로 받음 이때 첫글자 소문자로 바꾸고 복수형으로 변경
//collection lectures와 lectureSchema가 연결

module.exports = Lecture;