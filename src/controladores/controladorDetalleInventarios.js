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

//MODIFICAR
exports.Modificar = async(req, res) => {
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
        const { fisico, ultimo, ingreso, egreso, precio,  productos_Codigo, inventarios_id } = req.body;

        try {
            var buscarID = await modeloDetalleInventarios.findOne({
                where:{
                    id:id
                }
            });
           
            if (!buscarID) {
                msj.mensaje = 'El id del registro no existe'
                
            }else{
                buscarID.fisico = fisico;
                BuscarID.ultimo = ultimo;
                BuscarID.ingreso = ingreso;
                BuscarID.egreso = egreso;
                BuscarID.precio = precio;
                BuscarID.productos_Codigo = productos_Codigo;
                BuscarID.inventarios_id = inventarios_id;
                await buscarID.save(); 
                msj.mensaje = 'Registros actualizado';
            }
        } catch (error) {
            msj.mensaje = 'Error al modificar los datos';

        }
    }
    res.json(msj);
};


//Eliminar
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
            var BuscarDetalleInventarios = await modeloDetalleInventarios.findOne({
                where:{
                    id : id
                }
            });
           
            if (!BuscarDetalleInventarios) {
                msj.mensaje = 'El id del DetalleInventarios no existe'
                
            }else{                
                await modeloDetalleInventarios.destroy({
                    where: 
                    {
                        id : id
                    }
                });
                msj.mensaje = 'Registro eliminado correctamente';
            }
        } catch (error) {
            msj.mensaje = 'Error al eliminar registro';

        }
    }
    res.json(msj);
 };