var Usuario = require('../models').Usuario;

var usuarioController ={
    home: function(req, res){
        return res.status(200).send({mensaje: "Home del controlador Usuario!!!"});
    },
    createUsuario: function (req, res){
        var objUsuario = new Usuario();
        var params = req.body;
        //params.nombre debe ser igual que los parametros recibidos desde el cliente o postman
        objUsuario.name = params.name;
        objUsuario.nombre = params.nombre;
        objUsuario.apellido = params.apellido;
        objUsuario.fecha_nacimiento = params.fecha_nacimiento;
        objUsuario.email = params.email;
        objUsuario.password = params.password;
        objUsuario.contacto = params.contacto;
        objUsuario.ubicacion_id = params.ubicacion_id;
        
        console.log('RECIBIDO:::::: ', objUsuario.name, objUsuario.nombre, objUsuario.apellido, objUsuario.fecha_nacimiento, objUsuario.email, objUsuario.password, objUsuario.contacto, objUsuario.ubicacion_id);
        console.log('GUARDANDO USUARIO!!!!');
        
        Usuario.create({ 
            //usuario_nombre debe ser igual al nonbre del campo en la base de datos (ojo respetar Mayusculas y minusculas)
            
            usuario_name: objUsuario.name,
            usuario_nombre: objUsuario.nombre,
            usuario_apellido: objUsuario.apellido,
            usuario_fecha_nacimiento: objUsuario.fecha_nacimiento,
            usuario_email: objUsuario.email,
            usuario_password: objUsuario.password,
            usuario_contacto: objUsuario.contacto,
            t_ubicacion_id: objUsuario.ubicacion_id

        }).then(usuarioGuardado => {
            if(!usuarioGuardado){
                return res.status(404).send({ error : "Error mientras se guardaba el usuario en la base de datos: "});
            }
            return res.status(200).send({ saved : usuarioGuardado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getUsuarioById : function (req, res){
        var id = req.params.id;        
        console.log('id recibido: ', id);   
        
        Usuario.findByPk(id).then(usuario => {
            if(!usuario){
                return res.status(404).send({ error : "No se encontró ningun usuario con ese id en la base de datos"});
            }
            return res.status(200).send({ found : usuario});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getAllUsuarios : function (req, res){
        console.log('Trayendo todas las categorías');
        Usuario.findAll().then(usuariosEncontrados => {
            if(usuariosEncontrados.length == 0){
                return res.status(400).send({error: "No se encontró ningun usuario en la base de datos"});
            }else{
                return res.json(usuariosEncontrados);
            }
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    updateUsuarioById: function(req, res){
        var id = req.params.id;
        var parametrosNuevos = req.body;
        console.log('Id Recibido: ', id);
        
        Usuario.update({
            usuario_nombre: parametrosNuevos.nombre,
            t_categoria_id: parametrosNuevos.categoria_id,
        },{ 
            where: { usuario_id: id } 
        }).then(usuarioActualizado => {
            if(!usuarioActualizado){
                return res.status(404).send({ error : "Error, No existe ese usuario en la base de datos"});
            }
            return res.status(200).send({ updated : usuarioActualizado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    deleteUsuarioById : function (req, res){
        var usuarioId = req.params.id;
        Usuario.destroy({ 
            where: { usuario_id: usuarioId } 
        }).then(usuarioEliminado => {
            if(!usuarioEliminado){
                return res.status(404).send({ error : "Error, el usuario no existe en la base de datos"});
            }
            return res.status(200).send({deleted : usuarioEliminado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
};
module.exports = usuarioController;