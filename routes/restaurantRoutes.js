'use strict';

var express = require('express');
var RestaurantController = require('../controllers/restaurantCtrl');

var restaurantrouter = express.Router();

restaurantrouter.get('/home-restaurant', RestaurantController.home);
restaurantrouter.post('/create-restaurant', RestaurantController.createRestaurant);
restaurantrouter.get('/restaurant/:id', RestaurantController.getRestaurantById);
restaurantrouter.get('/restaurants', RestaurantController.getAllRestaurants);
restaurantrouter.patch('/update-restaurant/:id', RestaurantController.updateRestaurantById);
restaurantrouter.delete('/delete-restaurant/:id', RestaurantController.deleteRestaurantById);

module.exports = restaurantrouter;