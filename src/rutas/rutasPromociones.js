const { Router } = require('express');            
const { body,query } = require('express-validator');     
const controladorPromociones = require('../controladores/controladorPromociones');          
const rutas = Router();                              
rutas.get('/listar',controladorPromociones.Listar);             

rutas.post('/guardar',
body ('productos_Codigo')
.notEmpty().withMessage('NO se aceptan valores vacios para el codigo del producto')                    
.isLength({min:2}).withMessage('la cantidad minima de caracteres para el codigo del producto es 2'), 
controladorPromociones.Guardar);


rutas.put('/editar',
query('id')
.notEmpty().withMessage('NO se aceptan valores vacios para el id de la promocion')
.isInt().withMessage('El id de la promocion debe ser un entero'),
body('productos_Codigo')
.notEmpty().withMessage('NO se aceptan valores vacios para el codigo del producto')                    
.isLength({min:2}).withMessage('la cantidad minima de caracteres para el codigo del producto es 2'),   
controladorPromociones.Editar);    
       

rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage('NO se aceptan valores vacios para el id de la promocion')
.isInt().withMessage('El id de la promocion debe ser un entero'),
controladorPromociones.Eliminar);                                           


module.exports = rutas;                                                   

