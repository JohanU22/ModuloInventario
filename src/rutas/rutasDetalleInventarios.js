const { Router } = require('express');
const { body,query } = require('express-validator');
const controladorDetalleInventarios = require('../controladores/controladorDetalleInventarios');
const rutas = Router();
//Ruta listar
rutas.get('/listar', controladorDetalleInventarios.Listar );

//Ruta Guardar
module.exports = rutas;