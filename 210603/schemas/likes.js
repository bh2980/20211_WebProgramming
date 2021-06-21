const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    like_list : Schema.Types.Array,
    basket_list : Schema.Types.Array,
});

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;