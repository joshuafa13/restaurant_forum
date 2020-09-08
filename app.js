const express = require('express')
const handlebars = require('express-handlebars')
const db = require('./models')
const app = express()
const port = 3000

app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars')

app.listen(port, () => {
  db.sequelize.sync()
  console.log(`Example app listening on port: ${3000}`)
})

require('./routes')(app)

