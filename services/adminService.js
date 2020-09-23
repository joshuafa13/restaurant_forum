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

  getRestaurant: (req, res, callback) => {
    Restaurant.findByPk(req.params.id, {
      raw: true,
      nest: true,
      include: Category
    }).then(restaurant => {
      callback({ restaurant })
    })
  },

  deleteRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id)
      .then((restaurant) => {
        restaurant.destroy()
          .then((restaurant) => {
            callback({ status: 'success', message: '' })
          })
      })
  },
}

module.exports = adminService