'use strict'

const Sequelize = require('sequelize');
var models = require("./models");
var app = require('./app');
var port = process.env.PORT || 3000;

//Sync Database
models.sequelize.sync().then(()=>{
    console.log("Sequelize se conectó correctamente a la Database");
    app.listen(port,()=>{
        console.log("API ejecutándose en puerto " + port);
    });
}).catch(err=>{
    console.log("Jorgito parece que tenemos un problema. Error: " + err);
});
