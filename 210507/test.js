const mongoose = require('mongoose')

const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

BlogPost.create({
    title: '이장훈',
    body: '2016114089'
}, (error, blogpost) => {
    console.log(error, blogpost)
})