'use strict';
module.exports = (sequelize, DataTypes) => {
    var Restaurant = sequelize.define('Restaurant', {
        restaurant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true            
        },
        restaurant_puntuacion: DataTypes.INTEGER(1),
        t_usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey:true,
            references: {
                // This is a reference to another model
                // model: t_usuario,
                
                // This is the column name of the referenced model
                key: 'usuario_id'
            }
        }
    },
    {
        //seccion de configuracion
        timestamps: false, //en true agrega el createdAt y updatedAt a las tablas
        // freezeTableName: true, // Model tableName will be the same as the model name
        underscored: true, // don't use camelcase for automatically added attributes but underscore style, so updatedAt will be updated_at
        tableName: 't_restaurant',//define el nombre de la tabla
    });
    Restaurant.associate = function(models) {
        // Restaurant pertenece a Usuario
        Restaurant.belongsTo(models.Usuario, { foreignKey: 't_usuario_id' });
    };
    return Restaurant;
};