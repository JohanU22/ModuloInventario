const { Router } = require('express');
const { body,query } = require('express-validator');
const controladorInventarioFisico=require('../controladores/controladorInventarioFisico');
const rutas = Router();

//Listar
rutas.get('/listar', controladorInventarioFisico.Listar);

//Guardar
rutas.post('/guardar',
    body ('productos_Codigo')
        .notEmpty().withMessage('No se aceptan valores vacios para el id')
        .isLength({max:15}).withMessage('La cantidad maxima de caracteres son 15 para el codigo de productos')
        .isInt().withMessage('El codigo de productos debe ser entero'),
    body ('inventarios_id')
        .notEmpty().withMessage('No se aceptan valores vacios para el inventarios_id')
        .isInt().withMessage('El codigo de productos debe ser entero'),
    body ('cantidadactual')
        .notEmpty().withMessage('No se aceptan valores vacios para la cantidadactual')
        .isFloat().withMessage('La cantidad la cantidadactual debe ser un flotante'),
    body ('cantidadsistema')
        .notEmpty().withMessage('No se aceptan valores vacios para cantidadsistema')
        .isFloat().withMessage('La cantidad de cantidadsistema debe ser un flotante'),
    body ('costo')
        .notEmpty().withMessage('No se aceptan valores vacios para el costo')
        .isFloat().withMessage('El valor del costo debe ser un flotante'),
    body ('precio')
        .notEmpty().withMessage('No se aceptan valores vacios para el precio')
        .isFloat().withMessage('La valor del precio debe ser un flotante'),
controladorProductos.Guardar);

//Modificar
rutas.put('/modificar',
    query ('id')
        .notEmpty().withMessage('No se aceptan valores vacios para el id')
        .isInt().withMessage('El id del inventario fisico debe ser entero'),
    body ('productos_Codigo')
        .notEmpty().withMessage('No se aceptan valores vacios para el id')
        .isLength({max:15}).withMessage('La cantidad maxima de caracteres son 15 para el codigo de productos')
        .isInt().withMessage('El codigo de productos debe ser entero'),
    body ('inventarios_id')
        .notEmpty().withMessage('No se aceptan valores vacios para el inventarios_id')
        .isInt().withMessage('El codigo de productos debe ser entero'),
    body ('cantidadactual')
        .notEmpty().withMessage('No se aceptan valores vacios para la cantidadactual')
        .isFloat().withMessage('La cantidad la cantidadactual debe ser un flotante'),
    body ('cantidadsistema')
        .notEmpty().withMessage('No se aceptan valores vacios para cantidadsistema')
        .isFloat().withMessage('La cantidad de cantidadsistema debe ser un flotante'),
    body ('costo')
        .notEmpty().withMessage('No se aceptan valores vacios para el costo')
        .isFloat().withMessage('El valor del costo debe ser un flotante'),
    body ('precio')
        .notEmpty().withMessage('No se aceptan valores vacios para el precio')
        .isFloat().withMessage('La valor del precio debe ser un flotante'),
controladorInventarioFisico.modificar);

//Eliminar
rutas.delete('/eliminar', 
    query('id')
        .notEmpty().withMessage('No se aceptan valores vacios para el id')
        .isInt().withMessage('El id del inventario fisico debe ser entero'),
controladorInventarioFisico.Eliminar);

module.exports=rutas;