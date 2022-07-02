const { validationResult } = require('express-validator');
const modeloInventario = require('../modelos/modeloInventario');
const { Op } = require('sequelize');

//Listar
exports.Listar = async (req, res) => {
    var msj = {
        mensaje: ''
    }
    try {
        
        const Lista = await modeloInventario.findAll();
        console.log(Lista);
        res.json(Lista);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
};

//Guardar
exports.Guardar = async (req, res) => {
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
        const {  fechahora, faltante, sobrante, usuarios_idregistro, estaciones_NumeroEstacion} = req.body;

        try {
            await modeloInventario.create(
                {
                    fechahora:fechahora,
                    faltante:faltante,
                    sobrante:sobrante,
                    usuarios_idregistro: usuarios_idregistro,
                    estaciones_NumeroEstacion:estaciones_NumeroEstacion
                });
            msj.mensaje = 'Registro almacenado';

        } catch (error) {
            msj.mensaje = 'Error al guardar los datos';

        }


    }
    res.json(msj);
};

//Editar
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
        const { fechahora, faltante, sobrante, usuarios_idregistro, estaciones_NumeroEstacion } = req.body;

        try {
            var buscarInventario = await modeloInventario.findOne({
                where:{
                    id:id
                }
            });
           
            if (!buscarInventario) {
                msj.mensaje = 'El id del inventario no existe'
                
            }else{
                buscarInventario.fechahora = fechahora;
                buscarInventario.faltante = faltante;
                buscarInventario.sobrante = sobrante ;
                buscarInventario.usuarios_idregistro = usuarios_idregistro ;
                buscarInventario.estaciones_NumeroEstacion = estaciones_NumeroEstacion;
                await buscarInventario.save(); 
                msj.mensaje = 'Registros actualizado';
            }
        } catch (error) {
            msj.mensaje = 'Error al editar los datos';

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
            var buscarInventario = await modeloInventario.findOne({
                where:{
                    id:id
                }
            });
           
            if (!buscarInventario) {
                msj.mensaje = 'El id del inventario no existe'
                
            }else{                
                await modeloInventario.destroy({
                    where: 
                    {
                        id:id
                    }
                });
                msj.mensaje = 'Registros  Eliminados';
            }
        } catch (error) {
            msj.mensaje = 'Error al eliminar los datos';

        }
    }
    res.json(msj);
 };
