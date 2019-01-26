'use strict';

var express = require('express');
var UbicacionController = require('../controllers/ubicacionCtrl');

var ubicacionRouter = express.Router();

ubicacionRouter.get('/home-ubicacion', UbicacionController.home);
ubicacionRouter.post('/create-ubicacion', UbicacionController.createUbicacion);
ubicacionRouter.get('/ubicacion/:id', UbicacionController.getUbicacionById);
ubicacionRouter.get('/ubicaciones', UbicacionController.getAllUbicacion);
ubicacionRouter.patch('/update-ubicacion/:id', UbicacionController.updateUbicacionById);
ubicacionRouter.delete('/delete-ubicacion/:id', UbicacionController.deleteUbicacionById);

module.exports = ubicacionRouter;