
var Categoria = require('../models').Categoria;

var categoriaController ={
    home: function(req, res){
        return res.status(200).send({mensaje: "Home del controlador Categoria!!!"});
    },
    createCategoria: function (req, res){
        var objCategoria = new Categoria();
        var params = req.body;
        //params.nombre debe ser igual que los parametros recibidos desde el cliente o postman
        objCategoria.nombre = params.nombre;
        objCategoria.descripcion = params.descripcion;
        
        console.log('Recibido: ', objCategoria.nombre, objCategoria.descripcion);
        console.log('GUARDANDO CATEGORIA!!!!');
        
        Categoria.create({ 
            //categoria_nombre debe ser igual al nonbre del campo en la base de datos (ojo respetar Mayusculas y minusculas)
            categoria_nombre: objCategoria.nombre,
            categoria_descripcion: objCategoria.descripcion
        }).then(categoriaGuardada => {
            if(!categoriaGuardada){
                return res.status(404).send({ error : "Error mientras se guardaba la categoria en la base de datos: "})
            }
            return res.status(200).send({ saved : categoriaGuardada});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getCategoriaById : function (req, res){
        var id = req.params.id;        
        console.log('id recibido: ', id);   
        
        Categoria.findByPk(id).then(categoria => {
            if(!categoria){
                return res.status(404).send({ error : "No se encontró ninguna categoria con ese id en la base de datos"});
            }
            return res.status(200).send({ found : categoria});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    getAllCategorias : function (req, res){
        console.log('Trayendo todas las categorías');
        Categoria.findAll().then(categoriasEncontradas => {
            if(categoriasEncontradas.length == 0){
                return res.status(400).send({error: "No se encontró ninguna categoria en la base de datos"});
            }else{
                return res.json(categoriasEncontradas);
            }
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    updateCategoriaById: function(req, res){
        var id = req.params.id;
        var parametrosNuevos = req.body;
        console.log('Id Recibido: ', id);

            Categoria.update({
                categoria_nombre: parametrosNuevos.nombre,
                categoria_descripcion: parametrosNuevos.descripcion,
            },{ 
                where: { categoria_id: id } 
            }).then(categoriaActualizada => {
                if(!categoriaActualizada){
                    return res.status(404).send({ error : "Error, No existe esa categoria en la base de datos"});
                }
                return res.status(200).send({ updated : categoriaActualizada});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
    deleteCategoriaById : function (req, res){
        var categoriaId = req.params.id;
        Categoria.destroy({ 
            where: { categoria_id: categoriaId } 
        }).then(categoriaEliminada => {
            if(!categoriaEliminada){
                return res.status(404).send({ error : "Error, la categoria no existe en la base de datos"});
            }
            return res.status(200).send({deleted : categoriaEliminada});
        }).catch((err) => {
            return res.status(500).send({error: "ERROR: " + err});
        });
    },
};
module.exports = categoriaController;