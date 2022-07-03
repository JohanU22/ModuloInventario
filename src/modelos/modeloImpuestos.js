const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const Impuesto = db.define(
    'impuestos', //Nombre de la tabla debe ser plural
    {
        idimpuesto:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        valor: {
            type: DataTypes.DECIMAL(10,4),
            allowNull: false
        },

    },
    {
        tableName: 'impuestos',
        timestamps: false, //Para que no se genere la columna de fecha de creacion y actualizacion
    }

);
module.exports = Impuesto;