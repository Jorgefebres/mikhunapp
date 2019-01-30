'use strict';

var express = require('express');
var CategoriaController = require('../controllers/categoriaCtrl');

var categoriaRouter = express.Router();

categoriaRouter.get('/',function(req, res, next){
    res.status(200).send('hola chiguagua')
});
categoriaRouter.get('/home-categoria', CategoriaController.home);
categoriaRouter.post('/create-categoria', CategoriaController.createCategoria);
categoriaRouter.get('/categoria/:id', CategoriaController.getCategoriaById);
categoriaRouter.get('/categorias', CategoriaController.getAllCategorias);
categoriaRouter.patch('/update-categoria/:id', CategoriaController.updateCategoriaById);
categoriaRouter.delete('/delete-categoria/:id', CategoriaController.deleteCategoriaById);

module.exports = categoriaRouter;