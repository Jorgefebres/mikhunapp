'use strict';

var express = require('express');
var MenuController = require('../controllers/menuCtrl');

var menuRouter = express.Router();

menuRouter.get('/home-menu', MenuController.home);
menuRouter.post('/create-menu', MenuController.createMenu);
menuRouter.get('/menu/:id', MenuController.getMenuById);
menuRouter.get('/menus', MenuController.getAllMenus);
menuRouter.patch('/update-menu/:id', MenuController.updateMenuById);
menuRouter.delete('/delete-menu/:id', MenuController.deleteMenuById);

module.exports = menuRouter;