'use strict';
module.exports = (sequelize, DataTypes) => {
    var Combo = sequelize.define('Combo', {
        combo_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        combo_descripcion: DataTypes.STRING(50),
        combo_precio: DataTypes.DECIMAL,
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
        },
        t_combo_padre_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey:true,
            references: {
                // This is a reference to another model
                model: 't_combo',
                
                // This is the column name of the referenced model
                key: 'combo_id'
            }
        }
    }, 
    {
        //seccion de configuracion
        timestamps: false, //en true agrega el createdAt y updatedAt a las tablas
        // freezeTableName: true, // Model tableName will be the same as the model name
        underscored: true, // don't use camelcase for automatically added attributes but underscore style, so updatedAt will be updated_at
        tableName: 't_combo',//define el nombre de la tabla
    });
    Combo.associate = function(models) {
        Combo.hasMany(models.PedidoDetalle, {foreignKey : 't_combo_id'});
        Combo.hasMany(models.Combo, { foreignKey: 't_combo_padre_id' });
        Combo.belongsTo(models.Combo, { foreignKey: 't_combo_padre_id' });
        Combo.belongsTo(models.Menu, { foreignKey: 't_menu_id' });       
      };
    return Combo;
};