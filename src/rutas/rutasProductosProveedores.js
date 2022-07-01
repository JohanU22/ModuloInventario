const { Router } = require('express');
const { body,query } = require('express-validator');
const controladorProductosProveedores =require('../controladores/controladorProductosProveedores');
const rutas = Router();
rutas.get('/listar', controladorProductosProveedores.Listar);

//rutas.post('/guardar',controladorProductos.guardar);
//rutas.put('/modificar',controladorProductos.modificar);

module.exports=rutas;