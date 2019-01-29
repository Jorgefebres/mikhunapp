var Menu = require('../models').Menu;

var menuController ={
    home: function(req, res){
        return res.status(200).send({mensaje: "Home del controlador Menu!!!"});
    },
    createMenu: function (req, res){
        var objMenu = new Menu();
        var params = req.body;
        //params.nombre debe ser igual que los parametros recibidos desde el menu o postman
        objMenu.menu_fecha = params.menu_fecha;
        objMenu.usuario_id = params.usuario_id;
        
        console.log('RECIBIDO:::::: ', objMenu.menu_fecha, objMenu.usuario_id);
        console.log('GUARDANDO MENU!!!!');
        
        Menu.create({ 
            //menu_nombre debe ser igual al nonbre del campo en la base de datos (ojo respetar Mayusculas y minusculas)
            menu_fecha: objMenu.fecha,
            t_usuario_id: objMenu.usuario_id,

        }).then(menuGuardado => {
            if(!menuGuardado){
                return res.status(404).send({ error : "Error mientras se guardaba el menu en la base de datos: "});
            }
            return res.status(200).send({ saved : menuGuardado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getMenuById : function (req, res){
        var id = req.params.id;        
        console.log('id recibido: ', id);   
        
        Menu.findByPk(id).then(menu => {
            if(!menu){
                return res.status(404).send({ error : "No se encontró ningun menu con ese id en la base de datos"});
            }
            return res.status(200).send({ found : menu});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getAllMenus : function (req, res){
        console.log('Trayendo todas los menus');
        Menu.findAll().then(menusEncontrados => {
            if(menusEncontrados.length == 0){
                return res.status(400).send({error: "No se encontró ningun menu en la base de datos"});
            }else{
                return res.json(menusEncontrados);
            }
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    updateMenuById: function(req, res){
        var id = req.params.id;
        var parametrosNuevos = req.body;
        console.log('Id Recibido: ', id);
        
        Menu.update({
            menu_nombre: parametrosNuevos.nombre,
            t_categoria_id: parametrosNuevos.categoria_id,
        },{ 
            where: { menu_id: id } 
        }).then(menuActualizado => {
            if(!menuActualizado){
                return res.status(404).send({ error : "Error, No existe ese menu en la base de datos"});
            }
            return res.status(200).send({ updated : menuActualizado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    deleteMenuById : function (req, res){
        var menuId = req.params.id;
        Menu.destroy({ 
            where: { menu_id: menuId } 
        }).then(menuEliminado => {
            if(!menuEliminado){
                return res.status(404).send({ error : "Error, el menu no existe en la base de datos"});
            }
            return res.status(200).send({deleted : menuEliminado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
};
module.exports = menuController;