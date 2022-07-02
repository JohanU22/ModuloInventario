const { validationResult } = require('express-validator');
const modeloDetalleInventarios = require('../modelos/modeloDetalleInventarios')
const { Op } = require('sequelize');
//LISTAR
exports.Listar = async (req, res) => {
    try{
        const lista = await modeloDetalleInventarios.findAll();//findOne()
        console.log(lista);
        res.json(lista);
    }
    catch(error){
        console.error(error);
        res.json(error);
  
    }

};
//GUARDAR
exports.Guardar = async (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = { 
        mensaje: ''
    };
    if(validaciones.errors.length > 0){
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + '. ';
        });
    }
    else{
        const { fisico, ultimo, ingreso, egreso, precio, productos_Codigo, inventarios_id} = req.body;
        try {
            await modeloDetalleInventarios.create({
                fisico: fisico,
                ultimo: ultimo,
                ingreso: ingreso,
                egreso: egreso,
                precio: precio,
            
                productos_Codigo: productos_Codigo,
                inventarios_id: inventarios_id
            });
            msj.mensaje='Registro almacenado correctamente';
        } 
        catch (error) {
            msj.mensaje='Registro no almacenado';
        }
    }
    res.json(msj);    
};
/*
//MODIFICAR
exports.Modificar = async(req,res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ''
    };

    if(validaciones.errors.lenght > 0){
        validaciones.errors.array.forEach(element => {
            msj.mensaje+=element.msg + '. ';
        });
    }  else{
        const {id} = req.query;
        const{fisico, ultimo, ingreso, egreso, precio, actual, balanceunidad, balanceprecio, productos_Codigo, inventarios_id} = req.body;
    }
*/
