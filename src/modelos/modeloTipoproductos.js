const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const Tipoproducto = db.define(
    'tipoproducto', //Nombre de la tabla debe ser plural
    {
        CodigoTipo:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false
        },
        NombreTipo:{
            type: DataTypes.STRING(30),
            allowNull: false

        },
        DescripcionTipo: {
            type: DataTypes.STRING(30),
            defaultValue: '',
            allowNull: true
        },
        orden: {
            type: DataTypes.INTEGER,
            defaultValue: '1',
            allowNull: true
        },
        idtipoprincipal: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: ''
        },
        nombreImagen:{
            type: DataTypes.TEXT,
            allowNull: true,

        }
    },
    {
        tableName: 'tipoproducto',
        timestamps: false,
    }
);



module.exports = Tipoproducto;