var Cliente = require('../models').Cliente;

var clienteController ={
    home: function(req, res){
        return res.status(200).send({mensaje: "Home del controlador Cliente!!!"});
    },
    createCliente: function (req, res){
        var objCliente = new Cliente();
        var params = req.body;
        //params.nombre debe ser igual que los parametros recibidos desde el cliente o postman
        objCliente.cliente_tipo = params.cliente_tipo;
        objCliente.usuario_id = params.usuario_id;

        console.log('RECIBIDO:::::: ', objCliente.cliente_tipo, objCliente.usuario_id);
        console.log('GUARDANDO CLIENTE!!!!');

        Cliente.create({
            //cliente_nombre debe ser igual al nonbre del campo en la base de datos (ojo respetar Mayusculas y minusculas)

            cliente_tipo: objCliente.cliente_tipo,
            t_usuario_id: objCliente.usuario_id,

        }).then(clienteGuardado => {
            if(!clienteGuardado){
                return res.status(404).send({ error : "Error mientras se guardaba el cliente en la base de datos: "});
            }
            return res.status(200).send({ saved : clienteGuardado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getClienteById : function (req, res){
        var id = req.params.id;
        console.log('id recibido: ', id);

        Cliente.findByPk(id).then(cliente => {
            if(!cliente){
                return res.status(404).send({ error : "No se encontró ningun cliente con ese id en la base de datos"});
            }
            return res.status(200).send({ found : cliente});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getAllClientes : function (req, res){
        console.log('Trayendo todas los clientes');
        Cliente.findAll().then(clientesEncontrados => {
            if(clientesEncontrados.length == 0){
                return res.status(400).send({error: "No se encontró ningun cliente en la base de datos"});
            }else{
                return res.json(clientesEncontrados);
            }
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    updateClienteById: function(req, res){
        var id = req.params.id;
        var parametrosNuevos = req.body;
        console.log('Id Recibido: ', id);

        Cliente.update({
            cliente_nombre: parametrosNuevos.nombre,
            t_categoria_id: parametrosNuevos.categoria_id,
        },{
            where: { cliente_id: id }
        }).then(clienteActualizado => {
            if(!clienteActualizado){
                return res.status(404).send({ error : "Error, No existe ese cliente en la base de datos"});
            }
            return res.status(200).send({ updated : clienteActualizado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    deleteClienteById : function (req, res){
        var clienteId = req.params.id;
        Cliente.destroy({
            where: { cliente_id: clienteId }
        }).then(clienteEliminado => {
            if(!clienteEliminado){
                return res.status(404).send({ error : "Error, el cliente no existe en la base de datos"});
            }
            return res.status(200).send({deleted : clienteEliminado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
};
module.exports = clienteController;
