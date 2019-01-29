var PedidoDetalle = require('../models').PedidoDetalle;

var pedidoDetalleController ={
    home: function(req, res){
        return res.status(200).send({mensaje: "Home del controlador PedidoDetalle!!!"});
    },
    createPedidoDetalle: function (req, res){
        var objPedidoDetalle = new PedidoDetalle();
        var params = req.body;
        //params.inicio debe ser igual que los parametros recibidos desde el cliente o postman
        objPedidoDetalle.cantidad = params.cantidad;
        objPedidoDetalle.subtotal = params.subtotal;
        objPedidoDetalle.tipo = params.tipo;
        objPedidoDetalle.pedido_id = params.pedido_id;
        objPedidoDetalle.combo_id = params.combo_id;
        objPedidoDetalle.menuPlato_id = params.menuPlato_id;
        
        console.log('Recibido: ', objPedidoDetalle.cantidad, objPedidoDetalle.subtotal, objPedidoDetalle.tipo, objPedidoDetalle.pedido_id, objPedidoDetalle.combo_id, objPedidoDetalle.menuPlato_id);
        console.log('GUARDANDO PEDIDO DETALLE!!!!');
        
        PedidoDetalle.create({ 
            //pedidoDetalle_inicio debe ser igual al nonbre del campo en la base de datos (ojo respetar Mayusculas y minusculas)
            pedido_detalle_cantidad: objPedidoDetalle.cantidad,
            pedido_detalle_subtotal: objPedidoDetalle.subtotal,
            pedido_detalle_tipo: objPedidoDetalle.tipo,
            t_menu_id: objPedidoDetalle.menu_id,
            t_plato_id: objPedidoDetalle.plato_id
        }).then(pedidoDetalleGuardado => {
            if(!pedidoDetalleGuardado){
                return res.status(404).send({ error : "Error mientras se guardaba el pedidoDetalle en la base de datos: "});
            }
            return res.status(200).send({ saved : pedidoDetalleGuardado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getPedidoDetalleById : function (req, res){
        var id = req.params.id;        
        console.log('id recibido: ', id);   
        
        PedidoDetalle.findByPk(id).then(pedidoDetalle => {
            if(!pedidoDetalle){
                return res.status(404).send({ error : "No se encontró ningun pedidoDetalle con ese id en la base de datos"});
            }
            return res.status(200).send({ found : pedidoDetalle});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getAllPedidoDetalles : function (req, res){
        console.log('Trayendo todos los pedidoDetalles');
        PedidoDetalle.findAll().then(pedidoDetallesEncontrados => {
            if(pedidoDetallesEncontrados.length == 0){
                return res.status(400).send({error: "No se encontró ningun pedidoDetalle en la base de datos"});
            }else{
                return res.json(pedidoDetallesEncontrados);
            }
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    updatePedidoDetalleById: function(req, res){
        var id = req.params.id;
        var parametrosNuevos = req.body;
        console.log('Id Recibido: ', id);
        
        PedidoDetalle.update({
            pedido_detalle_cantidad: parametrosNuevos.cantidad,
            pedido_detalle_subtotal: parametrosNuevos.subtotal,
            t_pedido_id: parametrosNuevos.pedido_id,
            t_combo_id: parametrosNuevos.combo_id,
            t_menu_plato_id: parametrosNuevos.menu_plato_id
        },{ 
            where: { pedido_detalle_id: id } 
        }).then(pedidoDetalleActualizado => {
            if(!pedidoDetalleActualizado){
                return res.status(404).send({ error : "Error, No existe ese pedidoDetalle en la base de datos"});
            }
            return res.status(200).send({ updated : pedidoDetalleActualizado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    deletePedidoDetalleById : function (req, res){
        var pedidoDetalleId = req.params.id;
        PedidoDetalle.destroy({ 
            where: { pedido_detalle_id: pedidoDetalleId } 
        }).then(pedidoDetalleEliminado => {
            if(!pedidoDetalleEliminado){
                return res.status(404).send({ error : "Error, el pedidoDetalle no existe en la base de datos"});
            }
            return res.status(200).send({deleted : pedidoDetalleEliminado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
};
module.exports = pedidoDetalleController;