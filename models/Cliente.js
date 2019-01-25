'use strict';
module.exports = (sequelize, DataTypes) => {
    var Cliente = sequelize.define('Cliente', {
        cliente_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true            
        },
        cliente_tipo: DataTypes.INTEGER(1),
        t_usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey:true,
            references: {
                // This is a reference to another model
                // model: t_user,
                
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
        tableName: 't_cliente',//define el nombre de la tabla
    });
    Cliente.associate = function(models) {
        // Cliente pertenece a Usuario
        Cliente.belongsTo(models.Usuario, { foreignKey: 't_usuario_id' });
    };
    return Cliente;
};