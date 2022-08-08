const sequelize = require('sequelize');
const db = new sequelize(

    /*
    'sifcon', //base
    'root',  //user
    'JMAF2002',  //contraseña
    {
        host: 'localhost', //directorio
        dialect: 'mysql', //motor sql
        port: 3306, //puerto que utiliza mysql
        */

    'sifcon', //sifcon   //base
    'root',   //root      //user
    'Root0417', //Root0417        //contraseña
    {
        host: 'localhost',  //localhost        //directorio
        dialect: 'mysql',   //motor sql
        port: 3306, //3306     //puerto que utiliza mysql

    }
);
module.exports = db;