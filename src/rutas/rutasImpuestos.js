const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorImpuestos = require('../controladores/controladorImpuestos');
const rutas = Router();

rutas.get('/listar', controladorImpuestos.Listar);


rutas.post('/guardar',
body ('nombre')
.notEmpty().withMessage('No se aceptan valores vacios para l nombre'),
body ('valor')
.notEmpty().withMessage('No se aceptan valores vacios para el valor del impuesto').isDecimal().withMessage('El valor del impuesto debe ser decimal'),
controladorImpuestos.Guardar);

rutas.put('/modificar',
query('idimpuesto')
.notEmpty().withMessage('No se aceptan valores vacios para el id del impuesto').isInt().withMessage("El valor del id debe ser entero"),
body('nombre')
.notEmpty().withMessage('No se aceptan valores vacios para el nombre del impuesto'),
body ('valor')
.notEmpty().withMessage('No se aceptan valores vacios para el valor del impuesto').isDecimal().withMessage('El valor del impuesto debe ser decimal'),
controladorImpuestos.Modificar);

rutas.delete('/eliminar',
query('idimpuesto')
.notEmpty().withMessage('No se aceptan valores vacios para el id del impuesto').isInt().withMessage("El valor del id debe ser entero"),
controladorImpuestos.Eliminar);

module.exports=rutas;