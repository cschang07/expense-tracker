const express = require('express')
const router = express.Router()
const dayjs = require('dayjs')

const Record = require('../../models/record')

router.get('/new', (req, res) => {
  return res.render('new')
})
//post new page 
router.post('/', (req, res) => {
  const userId = req.user._id
  const {name, date, category, amount} = req.body
  Record.create({name, date, category, amount, userId })
    .then(() => res.redirect('/'))
    .then(() => console.log('new expense created'))
    .catch(error => console.log(error))
})
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  return Record.findOne({ id, userId })
    .lean()
    .then( record => {
      record.date = dayjs(record.date).format('YYYY-MM-DD')
      res.render('edit', { record })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  const { name, date, category, amount } = req.body
  return Record.findOne({id, userId})
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
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  return Record.findOne({id, userId})
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router