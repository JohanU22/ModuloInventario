const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const InventarioFisico = require('./')
const Productos = require('./')
const DetalleInventario = db.define(
    'detalle_inventarios',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fisico:{
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        ultimo:{
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        ingreso:{
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        egreso:{
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        precio:{
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        actual:{
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        balanceunidad:{
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        balanceprecio:{
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        //LLAVES FORANEAS
        productos_Codigo:{
            type: DataTypes.STRING(15),
            allowNull: false
        },
        inventarios_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }

);


//Relaciones con las otras tablas
//tabla Inventario Fisico
DetalleInventario.hasMany(InventarioFisico,{
    foreignKey: 'inventarios_id',
    otherKey: 'id'
});
InventarioFisico.belongsTo(DetalleInventario,{
    foreignKey: 'inventarios_id',
    otherKey: 'id'
});
module.exports = InventarioFisico;

//tabla Productos
DetalleInventario.hasMany(Productos,{
    foreignKey: 'productos_Codigo',
    otherKey: 'id'
});
Productos.belongsTo(DetalleInventario,{
    foreignKey: 'productos_Codigo',
    otherKey: 'id'
});
module.exports = Productos;
