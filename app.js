const express = require('express')
const exphbs = require('express-handlebars');
const mongoose = require('mongoose')

const Record = require('./models/record')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

const PORT = 3000

// 設定首頁路由
app.get('/', (req, res) => {
  Record.find()//get all data in Record
  .lean()
  .then(records => res.render('index', { records }))
  .catch(e => console.log(e))
})


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})