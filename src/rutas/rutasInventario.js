const {Router} = require('express');
const { body, query } = require('express-validator');
const controladorInventario = require('../controladores/controladorInventario');
const rutas = Router();

//Modulo
rutas.get('/', controladorInventario.Inicio);

//BuscarID
rutas.get('/id',
query('id').notEmpty().withMessage('Debe escribir el id del inventario')
.isInt().withMessage('El id del inventario debe ser un numero entero'), 
controladorInventario.BuscarId);

//BuscarFiltro
rutas.get('/filtro',
query('filtro')
.notEmpty().withMessage('Debe escribir el filtro de Inventario')
.isLength({min: 3}).withMessage('Debe escribir un filtro de 3 caracteres como mínimo'),
controladorInventario.BuscarFiltro);

//Listar
rutas.get('/listar', controladorInventario.Listar);

//Guardar
rutas.post('/guardar',
body('usuarios_idregistro')
.notEmpty().withMessage('No se aceptan valores vacios para el id de registro').isInt().withMessage('El id de registro debe ser entero'),
body('estaciones_NumeroEstacion')
.notEmpty().withMessage('No se aceptan valores vacios para el id de estacion').isInt().withMessage('El id de estacion debe ser entero'),
controladorInventario.Guardar);

//Editar
rutas.put('/editar',
body('usuarios_idregistro')
.notEmpty().withMessage('No se aceptan valores vacios para el id de registro').isInt().withMessage('El id de registro debe ser entero'),
body('estaciones_NumeroEstacion')
.notEmpty().withMessage('No se aceptan valores vacios para el id de estacion').isInt().withMessage('El id de estacion debe ser entero'),
controladorInventario.Editar);

//Elimnar
rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage('No se aceptan valores vacios para el id de inventario').isInt().withMessage('El id de inventario debe ser entero'),
controladorInventario.Eliminar);

module.exports = rutas;