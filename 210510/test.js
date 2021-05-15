const mongoose = require('mongoose')

const Account = require('./models/CreateAccount')

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

Account.create({
    id: 'bh2980',
    password: '2016114089'
}, (error, account) => {
    console.log(error, account)
})