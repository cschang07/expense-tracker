const express = require('express')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


const routes = require('./routes')
require('./config/mongoose')

const app = express()

app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: '.hbs', helpers: {
    'isEqual': function (a, b) {
      return a === b
    }
  } }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)



const PORT = 3000

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})