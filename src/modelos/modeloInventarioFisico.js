const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const inventarioFisico = db.define(
    'inventario_fisico', 
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        productos_Codigo:{
            type: DataTypes.STRING(15),
            allowNull: false
        },
        inventarios_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cantidadactual: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        cantidadsistema: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        costo: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        precio: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        fechahora: {
            type: DataTypes.DATETIME,
            allowNull: true
        },
        balanceexistencia: {
            type: DataTypes.DOUBLE,
            defaultValue: '0',
            allowNull: true
        },
        faltante: {
            type: DataTypes.DOUBLE,
            defaultValue: '0',
            allowNull: true
        },
        sobrante: {
            type: DataTypes.DOUBLE,
            defaultValue: '0',
            allowNull: true
        }
    },
    {
        tableName: 'inventario_fisico',
        timestamps: false, //Para que no se genere la columna de fecha de creacion y actualizacion
    }

);
module.exports = inventarioFisico;