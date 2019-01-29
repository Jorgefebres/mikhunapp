var Pedido = require('../models').Pedido;

var pedidoController ={
    home: function(req, res){
        return res.status(200).send({mensaje: "Home del controlador Pedido!!!"});
    },
    createPedido: function (req, res){
        var objPedido = new Pedido();
        var params = req.body;
        //params.nombre debe ser igual que los parametros recibidos desde el pedido o postman
        objPedido.pedido_tipo = params.pedido_tipo;
        objPedido.pedido_fecha = params.pedido_fecha;
        objPedido.pedido_total = params.pedido_total;
        objPedido.usuario_id = params.usuario_id;
        
        console.log('RECIBIDO:::::: ', objPedido.pedido_tipo, objPedido.pedido_fecha, objPedido.pedido_total, objPedido.usuario_id);
        console.log('GUARDANDO Pedido!!!!');
        
        Pedido.create({ 
            //pedido_nombre debe ser igual al nonbre del campo en la base de datos (ojo respetar Mayusculas y minusculas)
            pedido_tipo: objPedido.pedido_tipo,
            pedido_fecha: objPedido.pedido_fecha,
            pedido_total: objPedido.pedido_total,
            t_usuario_id: objPedido.usuario_id,

        }).then(pedidoGuardado => {
            if(!pedidoGuardado){
                return res.status(404).send({ error : "Error mientras se guardaba el pedido en la base de datos: "});
            }
            return res.status(200).send({ saved : pedidoGuardado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getPedidoById : function (req, res){
        var id = req.params.id;        
        console.log('id recibido: ', id);   
        
        Pedido.findByPk(id).then(pedido => {
            if(!pedido){
                return res.status(404).send({ error : "No se encontró ningun pedido con ese id en la base de datos"});
            }
            return res.status(200).send({ found : pedido});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getAllPedidos : function (req, res){
        console.log('Trayendo todos los pedidos');
        Pedido.findAll().then(pedidosEncontrados => {
            if(pedidosEncontrados.length == 0){
                return res.status(400).send({error: "No se encontró ningun pedido en la base de datos"});
            }else{
                return res.json(pedidosEncontrados);
            }
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    updatePedidoById: function(req, res){
        var id = req.params.id;
        var parametrosNuevos = req.body;
        console.log('Id Recibido: ', id);
        
        Pedido.update({
            pedido_tipo: parametrosNuevos.pedido_tipo,
            pedido_fecha: parametrosNuevos.pedido_fecha,
            pedido_total: parametrosNuevos.pedido_total,
            t_usuario_id: parametrosNuevos.usuario_id,
        },{ 
            where: { pedido_id: id } 
        }).then(pedidoActualizado => {
            if(!pedidoActualizado){
                return res.status(404).send({ error : "Error, No existe ese pedido en la base de datos"});
            }
            return res.status(200).send({ updated : pedidoActualizado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    deletePedidoById : function (req, res){
        var pedidoId = req.params.id;
        Pedido.destroy({ 
            where: { pedido_id: pedidoId } 
        }).then(pedidoEliminado => {
            if(!pedidoEliminado){
                return res.status(404).send({ error : "Error, el pedido no existe en la base de datos"});
            }
            return res.status(200).send({deleted : pedidoEliminado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
};
module.exports = pedidoController;