'use strict';
module.exports = (sequelize, DataTypes) => {
    var Plato = sequelize.define('Plato', {
        plato_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        plato_nombre: DataTypes.STRING(50),
        t_categoria_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey:true,
            references: {
                // This is a reference to another model
                // model: t_categoria,
                
                // This is the column name of the referenced model
                key: 'categoria_id'
            }
        }
    }, 
    {
        //seccion de configuracion
        timestamps: false, //en true agrega el createdAt y updatedAt a las tablas
        freezeTableName: true, // Model tableName will be the same as the model name
        underscored: true, // don't use camelcase for automatically added attributes but underscore style, so updatedAt will be updated_at
        tableName: 't_plato',//define el nombre de la tabla
    });
    Plato.associate = function(models) {
        // Plato pertenece a Categoria
        Plato.belongsTo(models.Categoria, { foreignKey: 't_categoria_id' });
    };
    return Plato;
};