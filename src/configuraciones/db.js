const sequelize = require('sequelize');
const db = new sequelize(
    'sigres', //base
    'root',  //user
    'Root0417',  //contraseña
    {
        host: 'localhost', //directorio
        dialect: 'mysql', //motor sql
        port: 3306, //puerto que utiliza mysql
    }
);
module.exports = db;