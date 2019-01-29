'use strict';

var express = require('express');
var MenuPlatoController = require('../controllers/menuPlatoCtrl');

var menuPlatoRouter = express.Router();

menuPlatoRouter.get('/home-menuPlato', MenuPlatoController.home);
menuPlatoRouter.post('/create-menuPlato', MenuPlatoController.createMenuPlato);
menuPlatoRouter.get('/menuPlato/:id', MenuPlatoController.getMenuPlatoById);
menuPlatoRouter.get('/menuPlatos', MenuPlatoController.getAllMenuPlatos);
menuPlatoRouter.patch('/update-menuPlato/:id', MenuPlatoController.updateMenuPlatoById);
menuPlatoRouter.delete('/delete-menuPlato/:id', MenuPlatoController.deleteMenuPlatoById);

module.exports = menuPlatoRouter;