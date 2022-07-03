const { validationResult } = require('express-validator');
const modeloInventarioFisico = require('../modelos/modeloInventarioFisico');
const { Op } = require('sequelize');
const { and } = require('../configuraciones/db');

function validacion (req){
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
        msj.estado = 'precaucion';
        msj.mensaje = 'La peticion no se ejecuto';
        msj.errores = errores;
    }
    return msj;
};

exports.Listar = async (req, res) => {
    try{
        const lista = await modeloInventarioFisico.findAll();//findOne()
        console.log(lista);
        res.json(lista);
    }
    catch(error){
        console.error(error);
        res.json(error);
    }
};

exports.Guardar = async (req,res) =>{
    var msj = validacion(req);
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        const{id, productos_Codigo, inventarios_id, cantidadactual, cantidadsistema, costo, precio, fechahora, balanceexistencia, faltante, sobrante} = req.body;
        try {
            const buscar = await modeloInventarioFisico.findOne({where:{productos_Codigo: productos_Codigo, inventarios_id: inventarios_id}});
            if(buscar){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El producto ya esta registrado dentro del inventario',
                    parametro: 'productos_Codigo',
                };
                msjRes(res, 200, msj);
            }
            else{
                await modeloInventarioFisico.create({
                    ...req.body,
                })
                .then((data)=>{
                    msj.datos=data;
                    msjRes(res, 200, msj);
                })
                .catch((er)=>{
                    msj.estado = 'error';
                    msj.mensaje = 'La peticion no se ejecuto';
                    msj.errores = er.parent.sqlMessage;
                    msjRes(res, 500, msj);
                });
            }
        } 
        catch (er) {
            console.error(er);
            msj.estado = 'error';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = er;
            msjRes(res, 500, msj);
        }
    }
};

exports.Modificar = async (req, res) =>{
    var msj = validacion(req);
    
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try {
            const { id } = req.query;
            var buscar = await modeloInventarioFisico.findByPk(id);
            if(!buscar){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El id del Inventario Fisico no existe',
                    parametro: 'id',
                };
                msjRes(res, 200, msj);
            }
            else{
                await modeloInventarioFisico.update(
                    {...req.body},
                    { where:{id: id}})
                    .then((data) => {
                        msj.datos=data;
                        msjRes(res, 200, msj);
                    })
                    .catch((er)=>{
                        msj.estado = 'error';
                        msj.mensaje = 'La peticion no se ejecuto';
                        msj.errores = er.parent.sqlMessage;
                        msjRes(res, 500, msj);
                    }
                );
            }
        } catch (error) {
            msj.estado = 'error';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = error;
            msjRes(res, 500, msj);
        }
    }
};

exports.Eliminar = async (req, res) =>{
    var msj = validacion(req);
    
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try {
            const { id } = req.query;
            var buscar = await modeloInventarioFisico.findByPk(id);
            if(!buscar){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El id del Inventario Fisico no existe',
                    parametro: 'id',
                };
                msjRes(res, 200, msj);
            }
            else{
                    await modeloInventarioFisico.destroy(
                    {where:{id: id}})
                    .then((data) => {
                        msj.datos=data;
                        msjRes(res, 200, msj);
                    })
                    .catch((er)=>{
                        msj.estado = 'error';
                        msj.mensaje = 'La peticion no se ejecuto';
                        msj.errores = er.parent.sqlMessage;
                        msjRes(res, 500, msj);
                    });
            }
        } catch (error) {
            msj.estado = 'error';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = error;
            msjRes(res, 500, msj);
        }
    }
};