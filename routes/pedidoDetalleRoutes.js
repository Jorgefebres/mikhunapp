'use strict';

var express = require('express');
var PedidoDetalleController = require('../controllers/pedidoDetalleCtrl');

var pedidoDetalleRouter = express.Router();

pedidoDetalleRouter.get('/home-pedidoDetalle', PedidoDetalleController.home);
pedidoDetalleRouter.post('/create-pedidoDetalle', PedidoDetalleController.createPedidoDetalle);
pedidoDetalleRouter.get('/pedidoDetalle/:id', PedidoDetalleController.getPedidoDetalleById);
pedidoDetalleRouter.get('/pedidoDetalles', PedidoDetalleController.getAllPedidoDetalles);
pedidoDetalleRouter.patch('/update-pedidoDetalle/:id', PedidoDetalleController.updatePedidoDetalleById);
pedidoDetalleRouter.delete('/delete-pedidoDetalle/:id', PedidoDetalleController.deletePedidoDetalleById);

module.exports = pedidoDetalleRouter;