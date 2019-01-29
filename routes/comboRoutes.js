'use strict';

var express = require('express');
var ComboController = require('../controllers/comboCtrl');

var comboRouter = express.Router();

comboRouter.get('/home-combo', ComboController.home);
comboRouter.post('/create-combo', ComboController.createCombo);
comboRouter.get('/combo/:id', ComboController.getComboById);
comboRouter.get('/combos', ComboController.getAllCombos);
comboRouter.patch('/update-combo/:id', ComboController.updateComboById);
comboRouter.delete('/delete-combo/:id', ComboController.deleteComboById);

module.exports = comboRouter;