const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user_id:String,
    lecture_id:Schema.Types.ObjectId,
    rating:Number,
    comment:String,
});

const Comment = mongoose.model('Comment', CommentSchema);
//첫번째 인자를 컬렉션 이름으로 받음 이때 첫글자 소문자로 바꾸고 복수형으로 변경
//collection lectures와 lectureSchema가 연결

module.exports = Comment;