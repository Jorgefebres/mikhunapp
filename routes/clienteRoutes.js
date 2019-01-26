'use strict';

var express = require('express');
var ClienteController = require('../controllers/clienteCtrl');

var clienteRouter = express.Router();

clienteRouter.get('/home-cliente', ClienteController.home);
clienteRouter.post('/create-cliente', ClienteController.createCliente);
clienteRouter.get('/cliente/:id', ClienteController.getClienteById);
clienteRouter.get('/clientes', ClienteController.getAllClientes);
clienteRouter.patch('/update-cliente/:id', ClienteController.updateClienteById);
clienteRouter.delete('/delete-cliente/:id', ClienteController.deleteClienteById);

module.exports = clienteRouter;