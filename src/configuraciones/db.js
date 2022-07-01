const sequelize = require('sequelize');
const db = new sequelize(
    'promociones',
    'root',
    'MARCELA1999',
    {
        host: 'localhost',                             //servidor o podemos poner el numero del servidor a que nos conectamos
        dialect: 'mysql',                              //gestor
        port: 3306                                     //puerto de mysql

    }
    
);
module.exports = db;