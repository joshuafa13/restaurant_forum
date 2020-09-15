const db = require('../models')
const Category = db.Category

const categoryController = {
  getCategories: (req, res) => {
    return Category.findAll({
      raw: true,
      nest: true
    }).then(categories => {
      return res.render('admin/categories', { categories })
    })
  },

  postCategory: (req, res) => {
    const { name } = req.body
    if (!name) {
      req.flash('error_messages', "Please type in category name!")
      return res.redirect('back')
    }
    return Category.create({ name })
      .then(category => {
        return res.redirect('/admin/categories')
      })
  }
}

module.exports = categoryController