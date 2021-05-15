const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    id: String,
    password: String
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;