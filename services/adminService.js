const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const User = db.User
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = 'c8b9a2211198b38'

const adminService = {
  getRestaurants: (req, res, callback) => {
    return Restaurant.findAll({
      raw: true,
      nest: true,
      include: Category
    }).then(restaurants => {
      callback({ restaurants })
    })
  },
}

module.exports = adminService