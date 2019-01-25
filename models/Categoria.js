'use strict';
module.exports = (sequelize, DataTypes) => {
    var Categoria = sequelize.define('Categoria', {
        categoria_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true            
        },
        categoria_nombre: DataTypes.STRING(30),
        categoria_descripcion: DataTypes.STRING(100)
    },
    {
        //seccion de configuracion
        timestamps: false, //en true agrega el createdAt y updatedAt a las tablas
        freezeTableName: true, // Model tableName will be the same as the model name
        underscored: true, // don't use camelcase for automatically added attributes but underscore style, so updatedAt will be updated_at
        tableName: 't_categoria',//define el nombre de la tabla
    });
    Categoria.associate = function(models) {
        // Shop hasMany Coffees
        Categoria.hasMany(models.Plato, {foreignKey : 't_categoria_id'});
      };
    return Categoria;
};