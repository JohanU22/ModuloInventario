const { validationResult } = require('express-validator');
const modeloProductoProveedores = require('../modelos/modeloProductosProveedores');
const { Op } = require('sequelize');

exports.Listar = async (req, res) => {
    try{
        const lista = await modeloProductoProveedores.findAll();//findOne()
        console.log(lista);
        res.json(lista);
    }
    catch(error){
        console.error(error);
        res.json(error);
    }
};

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
        const { idproducto, idproveedor } = req.body;
        try {
            await modeloProductoProveedores.create({
                idproducto: idproducto, 
                idproveedor: idproveedor
            });
            msj.mensaje='Registro almacenado';
        } 
        catch (error) {
            msj.mensaje='No existe el id';
        }
    }
    res.json(msj);    
};

exports.Editar = async(req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + '. ';
        });

    } else {
        const { id } = req.query;
        const { idproducto, idproveedor } = req.body;

        try {
            var buscarID = await modeloProductoProveedores.findOne({
                where:{
                    id:id
                }
            });
           
            if (!buscarID) {
                msj.mensaje = 'El id del registro no existe'
                
            }else{
                buscarID.idproducto = idproducto;
                buscarID.idproveedor = idproveedor;
                await buscarID.save(); 
                msj.mensaje = 'Registros actualizado';
            }
        } catch (error) {
            msj.mensaje = 'Error al editar los datos';

        }
    }
    res.json(msj);
};

exports.Eliminar = async(req, res)=> {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + '. ';
        });

    } else {
        const { id } = req.query;
        try {
            var buscarID = await modeloProductoProveedores.findOne({
                where:{
                    id:id
                }
            });
           
            if (!buscarID) {
                msj.mensaje = 'El id del registro no existe'
                
            }else{                
                await modeloProductoProveedores.destroy({
                    where: 
                    {
                        id:id
                    }
                });
                msj.mensaje = 'Registros  Eliminado';
            }
        } catch (error) {
            msj.mensaje = 'Error al eliminar los datos';

        }
    }
    res.json(msj);
 };