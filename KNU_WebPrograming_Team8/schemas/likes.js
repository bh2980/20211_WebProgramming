const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    like_list : Schema.Types.Array,
    basket_list : Schema.Types.Array,
    user_id:Schema.Types.ObjectId,
});

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;