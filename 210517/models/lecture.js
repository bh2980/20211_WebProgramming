var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var lectureSchema = new Schema({
    college: String,
    major: String,
    concentration:String,
    grade: String,
    lec_cat: String,
    lec_num: String,
    name: String,
    grades: String,
    theory: String,
    training: String,
    prefessor: String,
    time: String,
    real_time: String,
    lec_room: String,
    students: String,
    sugang: String,
    sugang_pack: String,
    pack_yes: String,
    etc: String,
    lec_method: String
});

module.exports = mongoose.model('lecture', lectureSchema);