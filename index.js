'use strict'

const Sequelize = require('sequelize');
var models = require("./models");
var app = require('./app');
var port = process.env.PORT || 3000;

//Sync Database
models.sequelize.sync().then(()=>{
    console.log("Conexion con la base de datos DB_Mikhuna exitosa!!");
    app.listen(port,()=>{
        console.log("Servidor corriendo perfectamente => localhost:3700");
    });
}).catch(err=>{
    console.log("Error: " + err);
});