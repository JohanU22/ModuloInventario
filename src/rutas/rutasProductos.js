const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorProductos = require('../controladores/controladorProductos');
const rutas = Router();

rutas.get('/', controladorProductos.Inicio);

rutas.get('/listar', controladorProductos.Listar);

rutas.get('/Codigo',
query('Codigo').notEmpty().withMessage('Debe escribir el Codigo del producto')
.isInt().withMessage('El Codigo del Producto debe ser un numero entero'), 
controladorProductos.BuscarId);

rutas.get('/filtro',
query('filtro')
.notEmpty().withMessage('Debe escribir el nombre del producto')
.isLength({min: 1}).withMessage('Debe escribir un nombre de 1 caracteres como mínimo'),
controladorProductos.BuscarFiltro);

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