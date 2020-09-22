const categoryService = require('../../services/categoryService')
const db = require('../../models')
const Category = db.Category

const categoryController = {
  getCategories: (req, res) => {
    categoryService.getCategories(req, res, (data) => {
      return res.json(data)
    })
  }
}

module.exports = categoryController