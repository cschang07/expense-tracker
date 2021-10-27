const express = require('express')
const exphbs = require('express-handlebars');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Record = require('./models/record')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

const PORT = 3000


app.get('/', (req, res) => {
  Record.find()//get all data in Record
    .lean()
    .sort({ _id: 'asc' })
    .then(records => res.render('index', { records }))
    .catch(error => console.log(error))
})
app.get('/records/new', (req, res) => {
  return res.render('new')
})
app.post('/records', (req, res) => {
  Record.create(req.body)
    .then(() => res.redirect('/'))
    .then(() => console.log('new expense created'))
    .catch(error => console.log(error))
})
app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(
      (record) => res.render('edit', { record })
    )
    .catch(error => console.log(error))
})
app.put('/records/:id', (req, res) => {
  const id = req.params.id
  const {name, date, category, amount} = req.body 
  return Record.findById(id)
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})
app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})