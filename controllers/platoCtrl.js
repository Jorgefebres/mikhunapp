var Plato = require('../models').Plato;

var platoController ={
    home: function(req, res){
        return res.status(200).send({mensaje: "Home del controlador Plato!!!"});
    },
    createPlato: function (req, res){
        var objPlato = new Plato();
        var params = req.body;
        //params.nombre debe ser igual que los parametros recibidos desde el cliente o postman
        objPlato.nombre = params.nombre;
        objPlato.categoria_id = params.categoria_id;
        
        console.log('Recibido: ', objPlato.nombre, objPlato.categoria_id);
        console.log('GUARDANDO PLATO!!!!');
        
        Plato.create({ 
            //plato_nombre debe ser igual al nonbre del campo en la base de datos (ojo respetar Mayusculas y minusculas)
            plato_nombre: objPlato.nombre,
            t_categoria_id: objPlato.categoria_id
        }).then(platoGuardado => {
            if(!platoGuardado){
                return res.status(404).send({ error : "Error mientras se guardaba el plato en la base de datos: "});
            }
            return res.status(200).send({ saved : platoGuardado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getPlatoById : function (req, res){
        var id = req.params.id;        
        console.log('id recibido: ', id);   
        
        Plato.findByPk(id).then(plato => {
            if(!plato){
                return res.status(404).send({ error : "No se encontró ningun plato con ese id en la base de datos"});
            }
            return res.status(200).send({ found : plato});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getAllPlatos : function (req, res){
        console.log('Trayendo todas las categorías');
        Plato.findAll().then(platosEncontrados => {
            if(platosEncontrados.length == 0){
                return res.status(400).send({error: "No se encontró ningun plato en la base de datos"});
            }else{
                return res.json(platosEncontrados);
            }
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    updatePlatoById: function(req, res){
        var id = req.params.id;
        var parametrosNuevos = req.body;
        console.log('Id Recibido: ', id);
        
        Plato.update({
            plato_nombre: parametrosNuevos.nombre,
            t_categoria_id: parametrosNuevos.categoria_id,
        },{ 
            where: { plato_id: id } 
        }).then(platoActualizado => {
            if(!platoActualizado){
                return res.status(404).send({ error : "Error, No existe ese plato en la base de datos"});
            }
            return res.status(200).send({ updated : platoActualizado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    deletePlatoById : function (req, res){
        var platoId = req.params.id;
        Plato.destroy({ 
            where: { plato_id: platoId } 
        }).then(platoEliminado => {
            if(!platoEliminado){
                return res.status(404).send({ error : "Error, el plato no existe en la base de datos"});
            }
            return res.status(200).send({deleted : platoEliminado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
};
module.exports = platoController;