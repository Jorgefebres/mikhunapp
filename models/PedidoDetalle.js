'use strict';
module.exports = (sequelize, DataTypes) => {
    var PedidoDetalle = sequelize.define('PedidoDetalle', {
        pedido_detalle_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        pedido_detalle_cantidad: DataTypes.INTEGER,
        pedido_detalle_subtotal: DataTypes.DECIMAL,
        t_pedido_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey:true,
            references: {
                // This is a reference to another model
                model: 't_pedido',
                
                // This is the column name of the referenced model
                key: 'pedido_id'
            }
        },
        t_combo_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey:true,
            references: {
                // This is a reference to another model
                model: 't_combo',
                
                // This is the column name of the referenced model
                key: 'combo_id'
            }
        },
        t_menu_plato_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey:true,
            references: {
                // This is a reference to another model
                model: 't_menu_plato',
                
                // This is the column name of the referenced model
                key: 'menu_plato_id'
            }
        }
    }, 
    {
        //seccion de configuracion
        timestamps: false, //en true agrega el createdAt y updatedAt a las tablas
        // freezeTableName: true, // Model tableName will be the same as the model name
        underscored: true, // don't use camelcase for automatically added attributes but underscore style, so updatedAt will be updated_at
        tableName: 't_pedido_detalle',//define el nombre de la tabla
    });
    PedidoDetalle.associate = function(models) {
        PedidoDetalle.belongsTo(models.Pedido, { foreignKey: 't_pedido_id' });
        PedidoDetalle.belongsTo(models.Combo, { foreignKey: 't_combo_id' });
        PedidoDetalle.belongsTo(models.MenuPlato, { foreignKey: 't_menu_plato_id' });
    };
    return PedidoDetalle;
};