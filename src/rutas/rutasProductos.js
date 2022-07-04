const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorProductos = require('../controladores/controladorProductos');
const rutas = Router();

rutas.get('/', controladorProductos.Inicio);

rutas.get('/listar', controladorProductos.Listar);

rutas.post('/guardar',
body ('Codigo')
.notEmpty().withMessage('No se aceptan valores vacios para el codigo').isLength({min:4}).withMessage('La cantidad minima de caracteres son 4 para el codigo de producto'),
body ('TipoProducto')
.notEmpty().withMessage('No se aceptan valores vacios para el tipo producto').isInt().withMessage('El id del tipoproducto debe ser un entero'),
controladorProductos.Guardar);

rutas.put('/modificar',
query('Codigo')
.notEmpty().withMessage('No se aceptan valores vacios para el codigo').isLength({min:4}).withMessage('La cantidad minima de caracteres son 4 para el codigo de producto'),
body('Nombre')
.notEmpty().withMessage('No se aceptan valores vacios para el nombre del producto'),
controladorProductos.Modificar);

rutas.delete('/eliminar',
query('Codigo')
.notEmpty().withMessage('No se aceptan valores vacios para el codigo'),
controladorProductos.Eliminar);
//rutas.put('/modificar',controladorProductos.modificar);

module.exports=rutas;