'use strict'

module.exports = (sequelize, DataTypes) => {
  var Ubicacion = sequelize.define('Ubicacion', {
      ubicacion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      ubicacion_latitud: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: true,
        defaultValue: null,
        validate: {
          min: -90,
          max: 90
        }
      },
      ubicacion_longitud: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: true,
        defaultValue: null,
        validate: {
          min: -180,
          max: 180
        }
      },
    },
    // {
    //     validate: {
    //         bothCoordsOrNone() {
    //             if ((this.latitude === null) !== (this.longitude === null)) {
    //                 throw new Error('Require either both latitude and longitude or neither')
    //             }
    //         }
    //     }
    // },
    {
      //seccion de configuracion
      timestamps: false, //en true agrega el createdAt y updatedAt a las tablas
      // freezeTableName: true, // Model tableName will be the same as the model name
      underscored: true, // don't use camelcase for automatically added attributes but underscore style, so updatedAt will be updated_at
      tableName: 't_ubicacion', //define el nombre de la tabla
    });
  Ubicacion.associate = function(models) {
    // Ubicacion pertenece a Usuario
    Ubicacion.hasMany(models.Usuario, {
      foreignKey: 't_ubicacion_id'
    });
  };
  return Ubicacion;
};
