const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const ProductoProveedor = db.define(
    'productoproveedores', //Nombre de la tabla debe ser plural
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        idproducto:{
            type: DataTypes.STRING(15),
            allowNull: false
        },
        idproveedor:{
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false
        },

    },
    {
        tableName: 'productoproveedores',
        timestamps: false, //Para que no se genere la columna de fecha de creacion y actualizacion
    }

);
module.exports = ProductoProveedor;