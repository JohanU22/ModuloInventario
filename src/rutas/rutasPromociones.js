const { Router } = require('express');            
const { body,query } = require('express-validator');     
const controladorPromociones = require('../controladores/controladorPromociones');          
const rutas = Router(); 
rutas.get('/inicio', controladorPromociones.Inicio );                             
rutas.get('/listar', controladorPromociones.Listar);             


rutas.get('/id', 
query('id').notEmpty().withMessage('Debe escribir el id del empleado')
.isInt().withMessage('El id del empleado debe ser un numero entero'),
controladorPromociones.BuscarId);

rutas.get('/filtro', 
query('productos_Codigo')
.notEmpty().withMessage('NO se aceptan valores vacios para el codigo del producto'),                    
controladorPromociones.BuscarFiltro);

rutas.post('/guardar',
body ('productos_Codigo')
.notEmpty().withMessage('NO se aceptan valores vacios para el codigo del producto')                    
.isLength({max:15}).withMessage('La cantidad maxima de caracteres son 15 para el codigo del producto'), 
controladorPromociones.Guardar);


rutas.put('/editar',
query('id')
.notEmpty().withMessage('NO se aceptan valores vacios para el id de la promocion')
.isInt().withMessage('El id de la promocion debe ser un entero'),
body('productos_Codigo')
.notEmpty().withMessage('NO se aceptan valores vacios para el codigo del producto')                    
.isLength({max:15}).withMessage('La cantidad maxima de caracteres son 15 para el codigo del producto'), 
controladorPromociones.Editar);    
       

rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage('NO se aceptan valores vacios para el id de la promocion')
.isInt().withMessage('El id de la promocion debe ser un entero'),
controladorPromociones.Eliminar);                                           


module.exports = rutas;                                                   

