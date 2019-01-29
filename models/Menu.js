'use strict';
module.exports = (sequelize, DataTypes) => {
    var Menu = sequelize.define('Menu', {
        menu_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        menu_fecha: DataTypes.DATEONLY,
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
        tableName: 't_menu',//define el nombre de la tabla
    });
    Menu.associate = function(models) {
        // Menu pertenece a Categoria
        Menu.belongsTo(models.Usuario, { foreignKey: 't_usuario_id' });
        Menu.hasMany(models.MenuPlato, {foreignKey : 't_menu_id'});
        Menu.hasMany(models.Combo, {foreignKey : 't_menu_id'});
    };
    return Menu;
};