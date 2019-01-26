var Restaurant = require('../models').Restaurant;

var restaurantController ={
    home: function(req, res){
        return res.status(200).send({mensaje: "Home del controlador Restaurant!!!"});
    },
    createRestaurant: function (req, res){
        var objRestaurant = new Restaurant();
        var params = req.body;
        //params.nombre debe ser igual que los parametros recibidos desde el restaurant o postman
        objRestaurant.restaurant_puntuacion = params.restaurant_puntuacion;
        objRestaurant.usuario_id = params.usuario_id;
        
        console.log('RECIBIDO:::::: ', objRestaurant.restaurant_puntuacion, objRestaurant.usuario_id);
        console.log('GUARDANDO RESTAURANT!!!!');
        
        Restaurant.create({ 
            //restaurant_nombre debe ser igual al nonbre del campo en la base de datos (ojo respetar Mayusculas y minusculas)
            
            restaurant_restaurant_puntuacion: objRestaurant.restaurant_puntuacion,
            t_usuario_id: objRestaurant.usuario_id,

        }).then(restaurantGuardado => {
            if(!restaurantGuardado){
                return res.status(404).send({ error : "Error mientras se guardaba el restaurant en la base de datos: "});
            }
            return res.status(200).send({ saved : restaurantGuardado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getRestaurantById : function (req, res){
        var id = req.params.id;        
        console.log('id recibido: ', id);   
        
        Restaurant.findByPk(id).then(restaurant => {
            if(!restaurant){
                return res.status(404).send({ error : "No se encontró ningun restaurant con ese id en la base de datos"});
            }
            return res.status(200).send({ found : restaurant});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getAllRestaurants : function (req, res){
        console.log('Trayendo todas las categorías');
        Restaurant.findAll().then(restaurantsEncontrados => {
            if(restaurantsEncontrados.length == 0){
                return res.status(400).send({error: "No se encontró ningun restaurant en la base de datos"});
            }else{
                return res.json(restaurantsEncontrados);
            }
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    updateRestaurantById: function(req, res){
        var id = req.params.id;
        var parametrosNuevos = req.body;
        console.log('Id Recibido: ', id);
        
        Restaurant.update({
            restaurant_nombre: parametrosNuevos.nombre,
            t_categoria_id: parametrosNuevos.categoria_id,
        },{ 
            where: { restaurant_id: id } 
        }).then(restaurantActualizado => {
            if(!restaurantActualizado){
                return res.status(404).send({ error : "Error, No existe ese restaurant en la base de datos"});
            }
            return res.status(200).send({ updated : restaurantActualizado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    deleteRestaurantById : function (req, res){
        var restaurantId = req.params.id;
        Restaurant.destroy({ 
            where: { restaurant_id: restaurantId } 
        }).then(restaurantEliminado => {
            if(!restaurantEliminado){
                return res.status(404).send({ error : "Error, el restaurant no existe en la base de datos"});
            }
            return res.status(200).send({deleted : restaurantEliminado});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
};
module.exports = restaurantController;