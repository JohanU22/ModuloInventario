const { DataTypes } = require('sequelize');       
const db = require('../configuraciones/db');
const Promocion = db.define(
    'promociones',
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
        inicio:{
            type: DataTypes.DATE,                           
            allowNull: true                           
        },
        fin:{
            type: DataTypes.DATE,                           
            allowNull: true                              
        },
        creado:{
            type: DataTypes.DATE,                           
            allowNull: true,
            defaultValue: 'CURRENT_TIMESTAMP'                             
        },
        modificado:{
            type: DataTypes.DATE,                           
            allowNull: true,
            defaultValue: 'CURRENT_TIMESTAMP'                           
        }
    },

      {
        tableName: 'promociones',                    
        timestamps: false                            
      } 
);
module.exports = Promocion;                   