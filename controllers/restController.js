const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const Comment = db.Comment
const User = db.User

const pageLimit = 10

const restController = {
  getRestaurants: (req, res) => {
    let offset = 0
    let whereQuery = {}
    let categoryId = ''
    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }
    if (req.query.categoryId) {
      categoryId = Number(req.query.categoryId)
      whereQuery = { CategoryId: categoryId }
    }
    return Restaurant.findAndCountAll({ include: Category, where: whereQuery, offset, limit: pageLimit })
      .then(result => {
        let page = Number(req.query.page) || 1
        let pages = Math.ceil(result.count / pageLimit)
        let totalPage = Array.from({ length: pages }).map((item, index) => index + 1)
        let prev = page - 1 < 1 ? 1 : page - 1
        let next = page + 1 > pages ? pages : page + 1
        const data = result.rows.map(r => ({
          ...r.dataValues,
          description: r.dataValues.description.substring(0, 50),
          isFavorited: req.user.FavoritedRestaurants.map(d => d.id).includes(r.dataValues.id),
          isLiked: req.user.LikedRestaurants.map(d => d.id).includes(r.dataValues.id),
          categoryName: r.Category.name
        }))
        Category.findAll({ raw: true, nest: true })
          .then(categories => {
            // console.log(data[0])
            return res.render('restaurants', { restaurants: data, categories, categoryId, page, totalPage, prev, next })
          })
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
      include: [
        Category,
        { model: User, as: 'LikedUsers' },
        { model: User, as: 'FavoritedUsers' },
        { model: Comment, include: [User] }
      ]
    }).then(restaurant => {
      const isFavorited = restaurant.FavoritedUsers.map(d => d.id).includes(req.user.id)
      const isLiked = restaurant.LikedUsers.map(d => d.id).includes(req.user.id)
      restaurant.increment('viewCounts')
      return res.render('restaurant', {
        isLiked,
        isFavorited,
        restaurant: restaurant.toJSON()
      })
    })
  },

  getFeeds: (req, res) => {
    return Restaurant.findAll({
      limit: 10,
      raw: true,
      nest: true,
      order: [['createdAt', 'DESC']],
      include: [Category]
    }).then(restaurants => {
      return Comment.findAll({
        limit: 10,
        raw: true,
        nest: true,
        order: [['createdAt', 'DESC']],
        include: [User, Restaurant]
      }).then(comments => {
        return res.render('feeds', {
          restaurants,
          comments
        })
      })
    })
  },

  getDashboard: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      include: [Comment, Category]
    })
      .then(restaurant => {
        console.log(restaurant.toJSON())
        return res.render('dashboard', {
          restaurant: restaurant.toJSON()
        })
      })
  },

  getTopRestaurants: (req, res) => {
    return Restaurant.findAll({
      include: [
        { model: User, as: 'FavoritedUsers' }
      ]
    }).then(restaurants => {
      console.log(req.user.FavoritedRestaurants)
      restaurants = restaurants.map(r => ({
        ...r.dataValues,
        description: r.description.substring(0, 50),
        FavoriteCounts: r.FavoritedUsers.length,
        isFavorited: req.user.FavoritedRestaurants.map(d => d.id).includes(r.id)
      }))
      restaurants = restaurants.sort((a, b) => b.FavoriteCounts - a.FavoriteCounts).slice(0, 10)
      return res.render('topRestaurants', { restaurants })
    })
  }
}
module.exports = restController