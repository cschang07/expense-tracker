const mongoose = require('mongoose')
const Record = require('../record')
const { recordSeeds } = require('./recordSeed.json')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Record.create(recordSeeds)
    .then(() => {
      console.log('recordSeed create done')
      return db.close()
    })
    .then(() => {
      console.log('database connection close.')
    })
})