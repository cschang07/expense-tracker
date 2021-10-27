const Record = require('../record')
const { recordSeeds } = require('./recordSeed.json')

const db = require('../../config/mongoose')

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
      console.log('database connection closed.')
    })
})