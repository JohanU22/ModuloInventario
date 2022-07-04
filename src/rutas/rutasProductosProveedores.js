const { Router } = require('express');
const { body,query } = require('express-validator');
const controladorProductosProveedores =require('../controladores/controladorProductosProveedores');
const rutas = Router();

//Modulo Inicio
rutas.get('/inicio', 
controladorProductosProveedores.Inicio);

//Listar
rutas.get('/listar', 
controladorProductosProveedores.Listar);

//BuscarID
rutas.get('/buscarid',
query('id')
    .notEmpty().withMessage('No se aceptan valores vacios para le id de productoProveedores')
    .isInt().withMessage('El id de productoProveedores debe ser un entero'), 
controladorProductosProveedores.BuscarId);

//Guardar
rutas.post('/guardar', 
body ('idproducto')
    .notEmpty().withMessage('No se aceptan valores vacios para el idproveedor')
    .isString().withMessage('El codigo de productos debe ser un string')
    .isLength({max:15}).withMessage('La cantidad maxima de caracteres son 15 para el codigo de productos')
    , 
body ('idproveedor')
    .notEmpty().withMessage('No se aceptan valores vacios para el idproveedor')
    .isInt().withMessage('El codigo de proveedores debe ser entero'), 
controladorProductosProveedores.Guardar);

//Modificar
rutas.put('/modificar',
query('id')
    .notEmpty().withMessage('No se aceptan valores vacios para le id de productoProveedores')
    .isInt().withMessage('El id de productoProveedores debe ser un entero'),
body ('idproducto')
    .notEmpty().withMessage('No se aceptan valores vacios para el idproveedor')
    .isString().withMessage('El codigo de productos debe ser un string')
    .isLength({max:15}).withMessage('La cantidad maxima de caracteres son 15 para el codigo de productos')
    , 
body ('idproveedor')
    .notEmpty().withMessage('No se aceptan valores vacios para el idproveedor')
    .isInt().withMessage('El codigo de proveedores debe ser entero'), 
controladorProductosProveedores.Editar);

//Eliminar
rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage('No se aceptan valores vacios para le id').isInt().withMessage('El id del empleado debe ser un entero'),
controladorProductosProveedores.Eliminar);
module.exports=rutas;

//filtro
/*
rutas.get('/filtro', 
query('filtro')
.notEmpty().withMessage('Debe escribir el filtro de busqueda del producto')
.isString().withMessage('Debe ser un string'),
controladorProductosProveedores.BuscarFiltro);*/