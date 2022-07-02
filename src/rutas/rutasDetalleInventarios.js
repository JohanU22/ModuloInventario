const { Router } = require('express');
const { body,query } = require('express-validator');
const controladorDetalleInventarios = require('../controladores/controladorDetalleInventarios');
const rutas = Router();
//Ruta listar
rutas.get('/listar', controladorDetalleInventarios.Listar );

//Ruta Guardar
rutas.post ('/guardar', 
 body ('productos_Codigo')
.notEmpty().withMessage('No se aceptan valores vacios para el id'),


body ('inventarios_id')
.notEmpty().withMessage('No se aceptan valores vacios para el id') 
.isInt().withMessage('El atributo inventarios_id debe ser un entero'),
controladorDetalleInventarios.Guardar);



///Ruta Modificar
rutas.put ('/Modificar',
query ('id'),
body ('productos_Codigo')
.notEmpty().withMessage('No se aceptan valores vacios para el id'),


body ('inventarios_id')
.notEmpty().withMessage('No se aceptan valores vacios para el id') 
.isInt().withMessage('El atributo inventarios_id debe ser un entero'),
controladorDetalleInventarios.Modificar);


//Ruta eliminar
rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage('No se aceptan valores vacios para el id'),
controladorDetalleInventarios.Eliminar);
//
module.exports=rutas;