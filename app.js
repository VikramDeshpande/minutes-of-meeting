const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Summary = require('./models/Summary');
const app = express();

mongoose.connect('mongodb://localhost:27017/minutes-of-meeting', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})


app.set('view engine', 'ejs')
//to join views directory to the main directory
app.set('views', path.join(__dirname, 'views'))

//without this, req.body won't work
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//home route
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/home/upload', (req, res) => {
    res.render('upload')
})

app.get('/home/summaries', async (req, res) => {
    const summaries = await Summary.find({})
    res.render('mysummaries', { summaries })
})

app.get('/home/summaries/:id', async (req, res) => {
    const { id } = req.params
    const summary = await Summary.findById(id)
    res.render('show', { summary })
})

app.get('/home/login', (req, res) => {
    res.render('login')
})

app.listen(3000, () => {
    console.log('Listening on port 3000.')
})