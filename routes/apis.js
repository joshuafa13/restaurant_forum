const express = require('express')
const router = express.Router()

const adminController = require('../controllers/api/adminController')
const { getRestaurant } = require('../services/adminService')

router.get('/admin/restaurants', adminController.getRestaurants)

router.get('/admin/restaurants/:id', adminController.getRestaurant)

module.exports = router
