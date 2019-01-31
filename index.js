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


// models.sequelize.sync().then(function() {
//     http.createServer(app).listen(app.get('port'), function(){
//       console.log('Conexion con la base de datos DB_Mikhuna exitosa!! ' + app.get('port'));
//     });
//   });