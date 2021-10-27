const express = require('express')
const mongoose = require('mongoose')


const app = express()

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
  res.send('hello world')
})


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})