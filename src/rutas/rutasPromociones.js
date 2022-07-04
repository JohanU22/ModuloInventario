const { Router } = require('express');            
const { body,query } = require('express-validator');     
const controladorPromociones = require('../controladores/controladoresPromociones');          
const rutas = Router();                              
rutas.get('/listar', controladorPromociones.Listar);             


rutas.get('/id', 
query('id').notEmpty().withMessage('Debe escribir el id del empleado')
.isInt().withMessage('El id del empleado debe ser un numero entero'),
controladorPromociones.BuscarId);

rutas.get('/filtro', 
query('filtro')
.notEmpty().withMessage('Debe escribir el filtro de busqueda del empleado')
.isLength({min: 3}).withMessage('Debe escribir un filtro de 3 caracteres como mínimo'),
controladorPromociones.BuscarFiltro);

rutas.post('/guardar',
body ('productos_Codigocol')
.notEmpty().withMessage('NO se aceptan valores vacios para el codigo del producto')                    
.isLength({max:15}).withMessage('La cantidad maxima de caracteres son 15 para el codigo del producto'), 
controladorPromociones.Guardar);


rutas.put('/editar',
query('id')
.notEmpty().withMessage('NO se aceptan valores vacios para el id de la promocion')
.isInt().withMessage('El id de la promocion debe ser un entero'),
body('productos_Codigocol')
.notEmpty().withMessage('NO se aceptan valores vacios para el codigo del producto')                    
.isLength({max:15}).withMessage('La cantidad maxima de caracteres son 15 para el codigo del producto'), 
controladorPromociones.Editar);    
       

rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage('NO se aceptan valores vacios para el id de la promocion')
.isInt().withMessage('El id de la promocion debe ser un entero'),
controladorPromociones.Eliminar);                                           


module.exports = rutas;                                                   


