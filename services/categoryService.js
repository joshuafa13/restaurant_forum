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

  putCategory: (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: 'Please type in category name!' })
    }
    return Category.findByPk(req.params.id)
      .then(category => {
        category.update({ name: req.body.name })
      })
      .then(category => {
        callback({ status: 'success', message: 'Category updated successfully!' })
      })
  },

  deleteCategory: (req, res, callback) => {
    return Category.findByPk(req.params.id)
      .then(category => {
        category.destroy()
          .then(category => {
            callback({ status: 'success', message: 'Category deleted!' })
          })
      })
  },
}

module.exports = categoryService