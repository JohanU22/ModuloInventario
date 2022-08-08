const {validationResult} = require('express-validator');
const { Op } = require('sequelize');

function validar(req){
    const validaciones = validationResult(req);
    var errores = [];
    var error = {
        mensaje: '',
        parametro: '',
    };
    var msj = {
        estado: 'correcto',
        mensaje: 'Peticion ejecutada correctamente',
        datos: '',
        errores: ''
    };
    if(validaciones.errors.length > 0)
    {
            validaciones.errors.forEach(element => {
                error.mensaje = element.msg;
                error.parametro = element.param;
                errores.push(error);
            });
            msj.estado = 'precaución';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = errores;
            
    }
    return msj;
};