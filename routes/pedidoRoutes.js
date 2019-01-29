'use strict';

var express = require('express');
var PedidoController = require('../controllers/pedidoCtrl');

var pedidoRouter = express.Router();


pedidoRouter.get('/home-pedido', PedidoController.home);
pedidoRouter.post('/create-pedido', PedidoController.createPedido);
pedidoRouter.get('/pedido/:id', PedidoController.getPedidoById);
pedidoRouter.get('/pedidos', PedidoController.getAllPedidos);
pedidoRouter.patch('/update-pedido/:id', PedidoController.updatePedidoById);
pedidoRouter.delete('/delete-pedido/:id', PedidoController.deletePedidoById);

module.exports = pedidoRouter;