'use strict';
module.exports = (sequelize, DataTypes) => {
    var MenuPlato = sequelize.define('MenuPlato', {
        menu_plato_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        menu_plato_inicio: DataTypes.DATE,
        menu_plato_fin: DataTypes.DATE,
        menu_plato_cantidad: DataTypes.INTEGER,
        menu_plato_precio: DataTypes.DECIMAL,
        menu_plato_tipo: DataTypes.STRING(40),
        t_menu_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey:true,
            references: {
                // This is a reference to another model
                model: 't_menu',
                
                // This is the column name of the referenced model
                key: 'menu_id'
            }
        },
        t_plato_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey:true,
            references: {
                // This is a reference to another model
                model: 't_plato',
                
                // This is the column name of the referenced model
                key: 'plato_id'
            }
        }
    }, 
    {
        //seccion de configuracion
        timestamps: false, //en true agrega el createdAt y updatedAt a las tablas
        // freezeTableName: true, // Model tableName will be the same as the model name
        underscored: true, // don't use camelcase for automatically added attributes but underscore style, so updatedAt will be updated_at
        tableName: 't_menu_plato',//define el nombre de la tabla
    });
    MenuPlato.associate = function(models) {
        MenuPlato.belongsTo(models.Menu, { foreignKey: 't_menu_id' });
        MenuPlato.belongsTo(models.Plato, { foreignKey: 't_plato_id' });
        MenuPlato.hasMany(models.PedidoDetalle, {foreignKey : 't_menu_plato_id'});
    };
   
    return MenuPlato;
};