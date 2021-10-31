const dayjs = require('dayjs')
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = {
  家居物業: "fas fa-home",
  交通出行: "fas fa-shuttle-van",
  休閒娛樂: "fas fa-grin-beam",
  餐飲食品: "fas fa-utensils",
  其他: "fas fa-pen"
}

router.get('/', (req, res) => {
  let totalAmount = 0
  const filteredCategory = req.query.category || ''
  let filteredRecord = {}
  if (filteredCategory) {
    filteredRecord = { 'category': { '$regex': filteredCategory, '$options': 'i' } }
  }
  const userId = req.user._id

  Record.find({ userId,...filteredRecord })
    .lean()
    .then(records => {
      records.forEach(record => {
        record.icon = Category[record.category]
        record.date = dayjs(record.date).format('YYYY-MM-DD')
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount, filteredCategory })
    })
    .catch(error => console.error(error))

})

module.exports = router