'use strict'

const Sequelize = require('sequelize');
var models = require("./models");
var app = require('./app');
var puerto = 3700;

//Sync Database
models.sequelize.sync().then(()=>{
    console.log("Conexion con la base de datos DB_Mikhuna exitosa!!");
    app.listen(puerto,()=>{
        console.log("Servidor corriendo perfectamente => localhost:3700");
    });
}).catch(err=>{
    console.log("Error: " + err);
});