'use strict';

var express = require('express');
var PlatoController = require('../controllers/platoCtrl');

var platoRouter = express.Router();


platoRouter.get('/home-plato', PlatoController.home);
platoRouter.post('/create-plato', PlatoController.createPlato);
platoRouter.get('/plato/:id', PlatoController.getPlatoById);
platoRouter.get('/platos', PlatoController.getAllPlatos);
platoRouter.patch('/update-plato/:id', PlatoController.updatePlatoById);
platoRouter.delete('/delete-plato/:id', PlatoController.deletePlatoById);

module.exports = platoRouter;