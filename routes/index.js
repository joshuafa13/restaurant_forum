const restController = require('../controllers/restController')
const adminController = require('../controllers/adminControllers')
const userController = require('../controllers/userController')

module.exports = (app, passport) => {
  const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/signin')
  }
  const authenticateAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.isAdmin) { return next() }
      return res.redirect('/')
    }
    res.redirect('/signin')
  }

  app.get('/', authenticate, (req, res) => res.redirect('/restaurants'))
  app.get('/restaurants', authenticate, restController.getRestaurants)

  app.get('/admin', authenticateAdmin, (req, res) => res.redirect('/admin/restaurants'))
  app.get('/admin/restaurants', authenticateAdmin, adminController.getRestaurants)

  app.get('/signUp', userController.signUpPage)
  app.post('/signUp', userController.signUp)

  app.get('/signIn', userController.signInPage)
  app.post('/signIn', passport.authenticate('local', { failureRedirect: '/signIn', failureFlash: true }), userController.signIn)
  app.get('/logout', userController.logout)
}