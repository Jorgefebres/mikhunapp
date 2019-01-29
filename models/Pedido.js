'use strict';
module.exports = (sequelize, DataTypes) => {
    var Pedido = sequelize.define('Pedido', {
        pedido_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        pedido_tipo_compra: DataTypes.STRING(50),
        pedido_fecha:DataTypes.DATE,
        pedido_total:DataTypes.DECIMAL,
        t_usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey:true,
            references: {
                // This is a reference to another model
                model: 't_usuario',
                
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
        tableName: 't_pedido',//define el nombre de la tabla
    });
    Pedido.associate = function(models) {
        // Pedido pertenece a usuario
        Pedido.belongsTo(models.Usuario, { foreignKey: 't_usuario_id' });
        Pedido.hasMany(models.PedidoDetalle, {foreignKey : 't_pedido_id'});
    };
    return Pedido;
};