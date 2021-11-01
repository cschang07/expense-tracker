const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const routes = require('./routes')

const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()

app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: '.hbs', helpers: {
    'isEqual': function (a, b) {
      return a === b
    }
  } }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

usePassport(app)

app.use(flash())

//hand result of req.user & that of res.isAuthenticated over to res
app.use((req, res, next) => {
  //  console.log(req.user) 
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`App is running on http://localhost:${process.env.PORT}`)
})