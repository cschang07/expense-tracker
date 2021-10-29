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
  Record.find()//get all data in Record
    .lean()
    .sort({ _id: 'asc' })
    .then(records => {
      records.forEach(record => {
        record.icon = Category[record.category]
        record.date = dayjs(record.date).format('YYYY-MM-DD')
      })
      res.render('index', { records })
    })

    .catch(e => console.log(e))
})

module.exports = router