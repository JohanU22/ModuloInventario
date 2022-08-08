const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const Inventarios = db.define(
    'Inventarios',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fechahora:{
            type: DataTypes.DATE,
            allowNull: true
        },
        faltante:{
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        sobrante:{
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        usuarios_idregistro:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estaciones_NumeroEstacion:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'inventarios',
        timestamps: false //Para que no se genere la columna de fecha de creacion y actualizacion
    }
);

module.exports = Inventarios;