'use strict';
module.exports = (sequelize, DataTypes) => {
    var Usuario = sequelize.define('Usuario', {
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true            
        },
        usuario_name: DataTypes.STRING(30),
        usuario_nombre: DataTypes.STRING(40),
        usuario_apellido: DataTypes.STRING(40),
        usuario_fecha_nacimiento: DataTypes.DATEONLY,
        usuario_email: {
            type: DataTypes.STRING(100),
            isUnique: true,
            allowNull: false,
            validate:{
                isEmail : true
            }
        },
        usuario_password: DataTypes.STRING(30),
        usuario_contacto: DataTypes.STRING(30),
        t_ubicacion_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey:true,
            references: {
                // This is a reference to another model
                model: 't_ubicacion',                
                // This is the column name of the referenced model
                key: 'ubicacion_id'
            }
        }
    },
    {
        //seccion de configuracion
        timestamps: false, //en true agrega el createdAt y updatedAt a las tablas
        freezeTableName: true, // Model tableName will be the same as the model name
        underscored: true, // don't use camelcase for automatically added attributes but underscore style, so updatedAt will be updated_at
        tableName: 't_usuario',//define el nombre de la tabla
    });
    Usuario.associate = function(models) {
        Usuario.belongsTo(models.Ubicacion, { foreignKey: 't_ubicacion_id' });
        Usuario.hasMany(models.Cliente, {foreignKey : 't_usuario_id'});
        Usuario.hasMany(models.Menu, {foreignKey : 't_usuario_id'});
        Usuario.hasMany(models.Pedido, {foreignKey : 't_usuario_id'});
        Usuario.hasMany(models.Restaurant, {foreignKey : 't_usuario_id'});
      };
    return Usuario;
};