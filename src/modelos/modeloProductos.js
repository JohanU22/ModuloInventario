const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const Producto = db.define(
    'productos', //Nombre de la tabla debe ser plural
    {
        Codigo:{
            type: DataTypes.STRING(50),
            primaryKey: true,
            autoIncrement: false,
            allowNull: false
        },
        Nombre:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        TipoProducto: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Existencia: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        Precio: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        Costo: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        CantidadMinima: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        exento: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Habilitado: {
            type: DataTypes.INTEGER,
            defaultValue: '1',
            allowNull: true

        },
        tipo2: {
            type: DataTypes.ENUM('GE', 'EL', 'PR', 'AL'),
            allowNull: true,
            defaultValue: 'GE'
        },
        orden: {
            type: DataTypes.INTEGER,
            defaultValue: '1',
            allowNull: true
        },
        impuestov: {
            type: DataTypes.DOUBLE,
            defaultValue: '0',
            allowNull: true
        },
        impuestoValor: {
            type: DataTypes.DOUBLE,
            defaultValue: '0',
            allowNull: true
        },
        ultimo:{
            type: DataTypes.DOUBLE,
            defaultValue: '0',
            allowNull: true
        },
        nombreImagen:{
            type: DataTypes.STRING(250),
            allowNull: true
        },
        idprincipal:{
            type: DataTypes.STRING(15),
            //defaultValue: '1',
            allowNull: true
        },
        cantidadprincipal:{
            type: DataTypes.DOUBLE,
            defaultValue: '0',
            allowNull: true
        },
        idusuario:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        movimiento:{
            type: DataTypes.STRING(45),
            defaultValue: 'N/A',
            allowNull: true
        },

    },
    {
        tableName: 'productos',
        timestamps: false, //Para que no se genere la columna de fecha de creacion y actualizacion
    }

);
module.exports = Producto;