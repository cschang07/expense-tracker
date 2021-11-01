if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

const User = require('../user')
const Record = require('../record')
const { recordSeeds } = require('./recordSeed.json')

const password = '12345678'

return bcrypt
  .genSalt(10)
  .then(salt => bcrypt.hash(password, salt))
  .then(hash => {
    return [{
      name: 'user1',
      email: 'user1@example.com',
      password: hash
    },
    {
      name: 'user2',
      email: 'user2@example.com',
      password: hash
    }]
  })
  .then(userSeed => {
    db.once('open', () => {
      User
        .create(userSeed)
        .then((user) => {
          const [{ _id: user1_id }, { _id: user2_id }] = user
          return Promise.all(recordSeeds.map((item) => {
            if (item.id <= 3) {
              return Record.create(Object.assign(item, { userId: user1_id }))
            } else if (item.id > 3) {
              return Record.create(Object.assign(item, { userId: user2_id }))
            }
          }))
        })
        .finally(() => {
          console.log('Data created.')
          process.exit()
        })
        .catch(err => console.log(err))
    })
  })



// router.post('/', (req, res) => {
//   const userId = req.user._id
//   const { name, date, category, amount } = req.body
//   Record.create({ name, date, category, amount, userId })
//     .then(() => res.redirect('/'))
//     .then(() => console.log('new expense created'))
//     .catch(error => console.log(error))
// })
// router.get('/:id/edit', (req, res) => {
//   const userId = req.user._id
//   const id = req.params.id
//   return Record.findOne({ id, userId })
//     .lean()
//     .then(record => {
//       record.date = dayjs(record.date).format('YYYY-MM-DD')
//       res.render('edit', { record })
//     })
//     .catch(error => console.log(error))
// })

  // .then(userSeed => {
  //   db.once('open', () => {
  //     User
  //       .create(userSeed)
  //       .then((user) => {
  //         const [{ _id: user1_id }, { _id: user2_id }] = user
  //         return Promise.all(recordSeeds.map((item, index) => {
  //           if (index < 3) {
  //             return Record.create(Object.assign(item, { userId: user1_id }))
  //           } else if (index > 3 && index < 7) {
  //             return Record.create(Object.assign(item, { userId: user2_id }))
  //           }
  //         }))
  //       })
  //       .finally(() => {
  //         console.log('Data created.')
  //         process.exit()
  //       })
  //       .catch(err => console.log(err))
  //   })
  // })