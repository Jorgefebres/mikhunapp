var MenuPlato = require('../models').MenuPlato;

var menuPlatoController ={
    home: function(req, res){
        return res.status(200).send({mensaje: "Home del controlador MenuPlato!!!"});
    },
    createMenuPlato: function (req, res){
        var objMenuPlato = new MenuPlato();
        var params = req.body;
        //params.inicio debe ser igual que los parametros recibidos desde el cliente o postman
        objMenuPlato.inicio = params.inicio;
        objMenuPlato.fin = params.fin;
        objMenuPlato.cantidad = params.cantidad;
        objMenuPlato.precio = params.precio;
        objMenuPlato.tipo = params.tipo;
        objMenuPlato.menu_id = params.menu_id;
        objMenuPlato.plato_id = params.plato_id;
        
        console.log('Recibido: ', objMenuPlato.inicio, objMenuPlato.fin, objMenuPlato.cantidad, objMenuPlato.precio, objMenuPlato.tipo, objMenuPlato.menu_id, objMenuPlato.plato_id);
        console.log('GUARDANDO MENU PLATO!!!!');
        
        MenuPlato.create({ 
            //menuPlato_inicio debe ser igual al nonbre del campo en la base de datos (ojo respetar Mayusculas y minusculas)
            menu_plato_inicio: objMenuPlato.inicio,
            menu_plato_fin: objMenuPlato.fin,
            menu_plato_cantidad: objMenuPlato.cantidad,
            menu_plato_precio: objMenuPlato.precio,
            menu_plato_tipo: objMenuPlato.tipo,
            t_menu_id: objMenuPlato.menu_id,
            t_plato_id: objMenuPlato.plato_id
        }).then(menuPlatoGuardado => {
            if(!menuPlatoGuardado){
                return res.status(404).send({ error : "Error mientras se guardaba el menuPlato en la base de datos: "});
            }
            return res.status(200).send({ saved : menuPlatoGuardado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getMenuPlatoById : function (req, res){
        var id = req.params.id;        
        console.log('id recibido: ', id);   
        
        MenuPlato.findByPk(id).then(menuPlato => {
            if(!menuPlato){
                return res.status(404).send({ error : "No se encontró ningun menuPlato con ese id en la base de datos"});
            }
            return res.status(200).send({ found : menuPlato});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getAllMenuPlatos : function (req, res){
        console.log('Trayendo todos los menuPlatos');
        MenuPlato.findAll().then(menuPlatosEncontrados => {
            if(menuPlatosEncontrados.length == 0){
                return res.status(400).send({error: "No se encontró ningun menuPlato en la base de datos"});
            }else{
                return res.json(menuPlatosEncontrados);
            }
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    updateMenuPlatoById: function(req, res){
        var id = req.params.id;
        var parametrosNuevos = req.body;
        console.log('Id Recibido: ', id);
        
        MenuPlato.update({
            menu_plato_inicio: parametrosNuevos.inicio,
            menu_plato_fin: parametrosNuevos.fin,
            menu_plato_cantidad: parametrosNuevos.cantidad,
            menu_plato_precio: parametrosNuevos.precio,
            menu_plato_tipo: parametrosNuevos.tipo,
            t_menu_id: parametrosNuevos.menu_id,
            t_plato_id: parametrosNuevos.plato_id
        },{ 
            where: { menu_plato_id: id } 
        }).then(menuPlatoActualizado => {
            if(!menuPlatoActualizado){
                return res.status(404).send({ error : "Error, No existe ese menuPlato en la base de datos"});
            }
            return res.status(200).send({ updated : menuPlatoActualizado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    deleteMenuPlatoById : function (req, res){
        var menuPlatoId = req.params.id;
        MenuPlato.destroy({ 
            where: { menu_plato_id: menuPlatoId } 
        }).then(menuPlatoEliminado => {
            if(!menuPlatoEliminado){
                return res.status(404).send({ error : "Error, el menuPlato no existe en la base de datos"});
            }
            return res.status(200).send({deleted : menuPlatoEliminado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
};
module.exports = menuPlatoController;