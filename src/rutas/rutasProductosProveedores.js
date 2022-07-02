const { Router } = require('express');
const { body,query } = require('express-validator');
const controladorProductosProveedores =require('../controladores/controladorProductosProveedores');
const rutas = Router();

rutas.get('/listar', 
controladorProductosProveedores.Listar);
module.exports=rutas;