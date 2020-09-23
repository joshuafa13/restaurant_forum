const db = require('../models')
const Category = db.Category

const categoryService = {
  getCategories: (req, res, callback) => {
    return Category.findAll({
      raw: true,
      nest: true
    })
      .then(categories => {
        if (req.params.id) {
          Category.findByPk(req.params.id)
            .then(category => {
              callback({ categories, category: category.toJSON() })
            })
        } else {
          callback({ categories })
        }
      })
  },

  postCategory: (req, res, callback) => {
    const { name } = req.body
    if (!name) {
      return callback({ status: 'error', message: 'Please type in category name!' })
    }
    return Category.create({ name })
      .then(category => {
        callback({ status: 'success', message: 'Category created!' })
      })
  },
}

module.exports = categoryService