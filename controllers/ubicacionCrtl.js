
var Ubicacion = require('../models').Ubicacion;

var ubicacionController ={
    home: function(req, res){
        return res.status(200).send({mensaje: "Home del controlador Ubicacion!!!"});
    },
    createUbicacion: function (req, res){
        var objUbicacion = new Ubicacion();
        var params = req.body;
        //params.nombre debe ser igual que los parametros recibidos desde el cliente o postman
        objUbicacion.latitud = params.latitud;
        objUbicacion.longitud = params.longitud;
        
        console.log('Recibido: ', objUbicacion.latitud, objUbicacion.longitud);
        console.log('GUARDANDO Ubicacion!!!!');
        
        Ubicacion.create({ 
            //categoria_nombre debe ser igual al nonbre del campo en la base de datos (ojo respetar Mayusculas y minusculas)
            ubicacion_latitud: objUbicacion.latitud,
            ubicacion_longitud: objUbicacion.longitud
        }).then(ubicacionGuardada => {
            if(!ubicacionGuardada){
                return res.status(404).send({ error : "Error mientras se guardaba la ubicacion en la base de datos: "})
            }
            return res.status(200).send({ saved : ubicacionGuardada});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getUbicacionById : function (req, res){
        var id = req.params.id;        
        console.log('id recibido: ', id);   
        
        Ubicacion.findByPk(id).then(ubicacion => {
            if(!ubicacion){
                return res.status(404).send({ error : "No se encontró ninguna ubicacion con ese id en la base de datos"});
            }
            return res.status(200).send({ found : ubicacion});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getAllUbicacion : function (req, res){
        console.log('Trayendo todas las ubicaciones');
        Ubicacion.findAll().then(ubicacionEncontradas => {
            if(ubicacionEncontradas.length == 0){
                return res.status(400).send({error: "No se encontró ninguna ubicacion en la base de datos"});
            }else{
                return res.json(ubicacionEncontradas);
            }
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    updateUbicacionById: function(req, res){
        var id = req.params.id;
        var parametrosNuevos = req.body;
        console.log('Id Recibido: ', id);

            Ubicacion.update({
                ubicacion_latitud: parametrosNuevos.latitud,
                ubicacion_longitud: parametrosNuevos.longitud,
            },{ 
                where: { ubicacion_id: id } 
            }).then(ubicacionActualizada => {
                if(!ubicacionActualizada){
                    return res.status(404).send({ error : "Error, No existe esa ubicacion en la base de datos"});
                }
                return res.status(200).send({ updated : ubicacionActualizada});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    deleteUbicacionById : function (req, res){
        var ubiacionId = req.params.id;
        Ubicacion.destroy({ 
            where: { ubicacion_id: ubiacionId } 
        }).then(ubicacionEliminada => {
            if(!ubicacionEliminada){
                return res.status(404).send({ error : "Error, la ubicacion no existe en la base de datos"});
            }
            return res.status(200).send({deleted : ubicacionEliminada});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
};
module.exports = ubicacionController;