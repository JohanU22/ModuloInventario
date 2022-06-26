const { Router } = require('express');
const { body,query } = require('express-validator');
const controladorProductos=require('../controladores/controladorProductos');
const rutas = Router();
rutas.get('/listar', controladorProductos.Listar);


//rutas.post('/guardar',controladorProductos.guardar);
//rutas.put('/modificar',controladorProductos.modificar);

module.exports=rutas;