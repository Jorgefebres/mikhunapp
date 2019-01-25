'use strict';

var express = require('express');
var UsuarioController = require('../controllers/usuarioCtrl');

var usuarioRouter = express.Router();


usuarioRouter.get('/home-usuario', UsuarioController.home);
usuarioRouter.post('/create-usuario', UsuarioController.createUsuario);
usuarioRouter.get('/usuario/:id', UsuarioController.getUsuarioById);
usuarioRouter.get('/usuarios', UsuarioController.getAllUsuarios);
usuarioRouter.patch('/update-usuario/:id', UsuarioController.updateUsuarioById);
usuarioRouter.delete('/delete-usuario/:id', UsuarioController.deleteUsuarioById);

module.exports = usuarioRouter;