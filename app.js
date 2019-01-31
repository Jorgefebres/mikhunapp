'use strict'

var express = require('express');
var bodyparser = require('body-parser');
var app = express();

// require('./api/config/passport');
// app.use(passport.initialize());
app.get('/', function(req, res) {
  res.send('funcionando');
});


//RUTAS
var rutas_de_categoria = require('./routes/categoriaRoutes');
var rutas_de_plato = require('./routes/platoRoutes');
var rutas_de_usuario = require('./routes/usuarioRoutes');
var rutas_de_ubicacion = require('./routes/ubicacionRoutes');
var rutas_de_cliente = require('./routes/clienteRoutes');
var rutas_de_restaurant = require('./routes/restaurantRoutes');
var rutas_de_combo = require('./routes/comboRoutes');
var rutas_de_menu = require('./routes/menuRoutes');
var rutas_de_pedido = require('./routes/pedidoRoutes');
var rutas_de_menuPlato = require('./routes/menuPlatoRoutes');
var rutas_de_pedidoDetalle = require('./routes/pedidoDetalleRoutes');

//MIDDLEWARES
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use((req, res, next) => {
    //para permitir quien podrá conectarse al servidor
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
});

// cargando archivo de rutas

app.get('/',function(req, res, next){
  res.send('hola ')
});
app.use('/API', rutas_de_categoria);
app.use('/API', rutas_de_plato);
app.use('/API', rutas_de_usuario);
app.use('/API', rutas_de_ubicacion);
app.use('/API', rutas_de_restaurant);
app.use('/API', rutas_de_cliente);
app.use('/API', rutas_de_combo);
app.use('/API', rutas_de_menu);
app.use('/API', rutas_de_pedido);
app.use('/API', rutas_de_menuPlato);
app.use('/API', rutas_de_pedidoDetalle);

module.exports = app;
