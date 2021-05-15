const express = require('express')
// const path = require('path')

const app = new express()
const ejs = require('ejs')
// const BlogPost = require('./models/BlogPost.js')
const fileUpload = require('express-fileupload')
app.use(fileUpload())

const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')


app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', homeController)
app.get('/post/:id', getPostController)

const validdateMiddleware = require('./middleware/validationMiddleware')

app.use('/posts/store', validdateMiddleware)
app.post('/posts/store', storePostController)

// app.get('/', async (req, res) => {
//     const blogposts = await BlogPost.find({})
//     res.render('index', {
//         blogposts
//     });
// })

// app.get('/about', (req, res) => {
//     res.render('about');
// })

// app.get('/contact', (req, res) => {
//     res.render('contact');
// })

// app.get('/post', (req, res) => {
//     res.render('post');
// })

// app.get('/post/:id', async(req, res) => {
//     const blogpost = await BlogPost.findById(req.params.id)
//     res.render('post', {
//         blogpost
//     });
// })

// app.get('/posts/new', (req, res)=>{
//     res.render('create')
// })

const newPostController = require('./controllers/newPost')

app.get('/posts/new', newPostController)

app.use(express.urlencoded({extended:true}))
app.use(express.json())

// app.use('/posts/store', (req, res, next)=>{
//     if(req.files == null || req.body.title == null || req.body.body == null){
//         return res.redirect('/posts/new')
//     }
//     next()
// })

// app.post('/posts/store', async (req, res)=>{
//     let image = req.files.image;
//     image.mv(path.resolve(__dirname, 'public/img', image.name), async(error)=>{
//         await BlogPost.create({
//             ...req.body,
//             image:'/img/'+image.name
//         })
//         res.redirect('/')
//     })
// })

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

app.listen(4000, () => {
    console.log('App listening on port 4000')
})