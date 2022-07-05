const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorTipoproductos = require('../controladores/controladorTipoproductos');
const rutas = Router();

rutas.get('/', controladorTipoproductos.Inicio);
rutas.get('/listar', controladorTipoproductos.Listar);

rutas.get('/Codigo',
query('CodigoTipo').notEmpty().withMessage('Debe escribir el Codigo del tipo de producto')
.isInt().withMessage('El Codigo del Producto debe ser un numero entero'),
controladorTipoproductos.BuscarId);

rutas.get('/filtro',
query('filtro')
.notEmpty().withMessage('Debe escribir el nombre del tipo producto')
.isLength({min: 1}).withMessage('Debe escribir un nombre de 1 caracteres como mínimo'),
controladorTipoproductos.BuscarFiltro);

rutas.post('/guardar',
body ('CodigoTipo')
.notEmpty().withMessage('No se aceptan valores vacios para el codigo').isLength({min:2}).withMessage('La cantidad minima de caracteres son 2 para el codigo de tipo producto'),
body ('NombreTipo')
.notEmpty().withMessage('No se aceptan valores vacios para el nombre del tipo producto'),
controladorTipoproductos.Guardar);

rutas.put('/modificar',
query('CodigoTipo')
.notEmpty().withMessage('No se aceptan valores vacios para el codigoTipo').isLength({min:2}).withMessage('La cantidad minima de caracteres son 2 para el codigo de tipo producto'),
body('NombreTipo')
.notEmpty().withMessage('No se aceptan valores vacios para el nombre del tipo producto'),
controladorTipoproductos.Modificar);

rutas.delete('/eliminar',
query('CodigoTipo')
.notEmpty().withMessage('No se aceptan valores vacios para el codigoTipo'),
controladorTipoproductos.Eliminar);
module.exports = rutas;