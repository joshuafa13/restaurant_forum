const restController = require('../controllers/restController')
const adminController = require('../controllers/adminControllers')
const userController = require('../controllers/userController')

module.exports = (app, passport) => {
  app.get('/', (req, res) => res.redirect('/restaurants'))
  app.get('/restaurants', restController.getRestaurants)

  app.get('/admin', (req, res) => res.redirect('/admin/restaurants'))
  app.get('/admin/restaurants', adminController.getRestaurants)

  app.get('/signUp', userController.signUpPage)
  app.post('/signUp', userController.signUp)

  app.get('/signIn', userController.signInPage)
  app.post('/signIn', passport.authenticate('local', { failureRedirect: '/signIn', failureFlash: true }), userController.signIn)
  app.get('/logout', userController.logout)
}