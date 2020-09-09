const db = require('../models')
const Restaurant = db.Restaurant

const adminController = {
  getRestaurants: (req, res) => {
    return Restaurant.findAll({ raw: true }).then(restaurants => {
      return res.render('admin/restaurants', { restaurants })
    })
  },

  createRestaurant: (req, res) => {
    return res.render('admin/create')
  },

  postRestaurant: (req, res) => {
    const { name, tel, address, opening_hours, description } = req.body
    if (!name) {
      res.flash('error_messages', 'Name is required field!')
      return res.redirect('back')
    }
    return Restaurant.create({
      name,
      tel,
      address,
      opening_hours,
      description
    })
      .then((restaurants) => {
        req.flash('success_messages', 'Restaurant was created successfully')
        res.redirect('/admin/restaurants')
      })
  },
}
module.exports = adminController