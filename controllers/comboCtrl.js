
var Combo = require('../models').Combo;

var comboController ={
    home: function(req, res){
        return res.status(200).send({mensaje: "Home del controlador Combo!!!"});
    },
    createCombo: function (req, res){
        var objCombo = new Combo();
        var params = req.body;
        //params.nombre debe ser igual que los parametros recibidos desde el cliente o postman
        objCombo.descripcion = params.descripcion;
        objCombo.precio = params.precio;
        objCombo.menu_id = params.menu_id;
        objCombo.plato_id = params.plato_id;
        objCombo.combo_padre_id = params.combo_padre_id;
        
        console.log('Recibido: ', objCombo.descripcion, objCombo.precio, objCombo.menu_id, objCombo.plato_id ,objCombo.combo_padre_id);
        console.log('GUARDANDO COMBO!!!!');
        
        Combo.create({ 
            //combo_descripcion debe ser igual al nonbre del campo en la base de datos (ojo respetar Mayusculas y minusculas)
            combo_descripcion: objCombo.descripcion,
            combo_precio: objCombo.precio,
            t_menu_id: objCombo.menu_id,
            t_plato_id: objCombo.plato_id,
            t_combo_padre_id: objCombo.combo_padre_id
        }).then(comboGuardada => {
            if(!comboGuardada){
                return res.status(404).send({ error : "Error mientras se guardaba el combo en la base de datos: "})
            }
            return res.status(200).send({ saved : comboGuardada});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getComboById : function (req, res){
        var id = req.params.id;        
        console.log('id recibido: ', id);   
        
        Combo.findByPk(id).then(combo => {
            if(!combo){
                return res.status(404).send({ error : "No se encontró ningun combo con ese id en la base de datos"});
            }
            return res.status(200).send({ found : combo});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getAllCombos : function (req, res){
        console.log('Trayendo todos los combos');
        Combo.findAll().then(comboEncontrados => {
            if(comboEncontradas.length == 0){
                return res.status(400).send({error: "No se encontró ningun combo en la base de datos"});
            }else{
                return res.json(comboEncontrados);
            }
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    updateComboById: function(req, res){
        var id = req.params.id;
        var parametrosNuevos = req.body;
        console.log('Id Recibido: ', id);

            Combo.update({
                combo_descripcion: parametrosNuevos.descripcion,
                combo_precio: parametrosNuevos.precio,
                t_menu_id: parametrosNuevos.menu_id,
                t_plato_id: parametrosNuevos.plato_id,
                t_combo_padre_id: parametrosNuevos.combo_padre_id
            },{ 
                where: { combo_id: id } 
            }).then(comboActualizado => {
                if(!comboActualizado){
                    return res.status(404).send({ error : "Error, No existe ese combo en la base de datos"});
                }
                return res.status(200).send({ updated : comboActualizado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    deleteComboById : function (req, res){
        var ubiacionId = req.params.id;
        Combo.destroy({ 
            where: { combo_id: ubiacionId } 
        }).then(comboEliminado => {
            if(!comboEliminado){
                return res.status(404).send({ error : "Error, el combo no existe en la base de datos"});
            }
            return res.status(200).send({deleted : comboEliminado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
};
module.exports = comboController;