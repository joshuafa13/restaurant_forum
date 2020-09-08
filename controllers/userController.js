const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

const userController = {
  signUpPage: (req, res) => {
    return res.render('signUp')
  },
  signUp: (req, res) => {
    const { name, email, password } = req.body
    User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
    }).then(user => {
      return res.redirect('/signIn')
    })
  }
}

module.exports = userController