const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const restController = {
  getRestaurants: (req, res) => {
    return Restaurant.findAll({ include: Category })
      .then(restaurants => {
        // console.log(restaurants[0])
        const data = restaurants.map(r => ({
          ...r.dataValues,
          description: r.dataValues.description.substring(0, 50),
          categoryName: r.Category.name
        }))
        // console.log(data[0])
        return res.render('restaurants', { restaurants: data })
      })
  },

  // getRestaurants: (req, res) => {
  //   return Restaurant.findAll({
  //     raw: true,
  //     nest: true,
  //     include: Category
  //   }).then(restaurants => {
  //     const data = restaurants.map(r => ({
  //       ...r,
  //       description: r.description.substring(0, 50),
  //       categoryName: r.Category.name
  //     }))
  //     console.log(data[0])
  //     return res.render('restaurants', { restaurants: data })
  //   })
  // },
  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      include: Category
    }).then(restaurant => {
      return res.render('restaurant', {
        restaurant: restaurant.toJSON()
      })
    })
  }
}
module.exports = restController