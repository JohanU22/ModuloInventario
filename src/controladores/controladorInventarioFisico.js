const { validationResult } = require('express-validator');
const modeloInventarioFisico = require('../modelos/modeloInventarioFisico');
const { Op } = require('sequelize');
const { and } = require('../configuraciones/db');

//Listar #######################################################
exports.Listar = async (req, res) => {
    var msj = {mensaje: ''}
    try{
        const lista = await modeloInventarioFisico.findAll();//findOne()
        console.log(lista);
        res.json(lista);
    }
    catch(error){
        console.error(error);
        res.json(error);
    }
    res.json(msj);
};

//Guardar #######################################################
exports.Guardar = async (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {mensaje: ''};
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {msj.mensaje += element.msg + '. ';});
    } else {
        const{id, productos_Codigo, inventarios_id, cantidadactual, cantidadsistema, costo, precio, fechahora, balanceexistencia, faltante, sobrante} = req.body;
        try {
            await modeloInventarioFisico.create(
                {
                    id:id,
                    productos_Codigo:productos_Codigo,
                    inventarios_id:inventarios_id,
                    cantidadactual:cantidadactual,
                    cantidadsistema:cantidadsistema,
                    costo:costo,
                    precio:precio,
                    fechahora:fechahora,
                    balanceexistencia:balanceexistencia,
                    faltante:faltante,
                    sobrante:sobrante
                });
            msj.mensaje = 'Registro agregado';
        } catch (error) {
            msj.mensaje = 'Error al guardar el registro';
        }
    }
    res.json(msj);
};

//Editar #######################################################
exports.Editar = async(req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {mensaje: ''};
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {msj.mensaje += element.msg + '. ';});
    } else {
        const { id } = req.query;
        const { productos_Codigo, inventarios_id, cantidadactual, cantidadsistema, costo, precio, fechahora, balanceexistencia, faltante, sobrante} = req.body;

        try {
            var buscarInvFis = await modeloInventarioFisico.findOne({where:{id:id}});
           
            if (!buscarInvFis) {
                msj.mensaje = 'El id del inventario fisico no existe'
            }else{
                buscarInvFis.productos_Codigo = productos_Codigo;
                buscarInvFis.inventarios_id = inventarios_id;
                buscarInvFis.cantidadactual = cantidadactual;
                buscarInvFis.cantidadsistema = cantidadsistema;
                buscarInvFis.costo = costo;
                buscarInvFis.precio = precio;
                buscarInvFis.fechahora = fechahora;
                buscarInvFis.balanceexistencia = balanceexistencia;
                buscarInvFis.faltante = faltante;
                buscarInvFis.sobrante = sobrante ;
                await buscarInvFis.save(); 
                msj.mensaje = 'Registro actualizado';
            }
        } catch (error) {
            msj.mensaje = 'Error al modificar los datos';
        }
    }
    res.json(msj);
};

//Eliminar #######################################################
exports.Eliminar = async(req, res)=> {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {msj.mensaje += element.msg + '. ';});
    } else {
        const { id } = req.query;
        try {
            var buscarInvFis = await modeloInventarioFisico.findOne({where:{id:id}});
           
            if (!buscarInvFis) {
                msj.mensaje = 'El id del inventario no existe'
                
            }else{                
                await modeloInventarioFisico.destroy({where: {id:id}});
                msj.mensaje = 'Registro Eliminado';
            }
        } catch (error) {
            msj.mensaje = 'Error al eliminar los datos';
        }
    }
    res.json(msj);
 };