const { validationResult } = require('express-validator');
const modeloImpuesto = require('../modelos/modeloImpuestos');
const { Op } = require('sequelize');

exports.Listar = async (req, res) => {
    try {
        const lista = await modeloImpuesto.findAll();//findOne()
        console.log(lista);
        res.json(lista);
    }
    catch (error) {
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

    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + '. ';
        });

    }
    else {
        const { nombre, valor } = req.body;
            try {
                await modeloImpuesto.create(
                    {
                        nombre: nombre,
                        valor: valor,
                    });
                msj.mensaje = 'Registro almacenado en Impuestos';
            }
            catch (error) {
                //msj.mensaje = 'Error al guardar los datos';
                console.log(error)
            }

    }

    res.json(msj);
};

exports.Modificar = async (req, res) => {
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
        const { idimpuesto } = req.query;
        const { nombre, valor } = req.body;

        try {
            var buscarImpuesto = await modeloImpuesto.findOne({
                where: {
                    idimpuesto: idimpuesto
                }
            });

            if (!buscarImpuesto) {
                msj.mensaje = 'El codigo del impuesto no existe'

            } else {
                buscarImpuesto.nombre = nombre;
                buscarImpuesto.valor = valor;
                await buscarImpuesto.save();
                msj.mensaje = 'Registro actualizado';
            }
        } catch (error) {
            msj.mensaje = 'Error al modificar los datos';

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
        const { idimpuesto } = req.query;
        try {
            var buscarImpuesto = await modeloImpuesto.findOne({
                where:{
                    idimpuesto:idimpuesto
                }
            });
           
            if (!buscarImpuesto) {
                msj.mensaje = 'El codigo del impuesto no existe'
                
            }else{                
                await modeloImpuesto.destroy({
                    where: 
                    {
                        idimpuesto:idimpuesto
                    }
                });
                msj.mensaje = 'Registro Eliminado';
            }
        } catch (error) {
            msj.mensaje = 'Error al eliminar los datos';

        }
    }
    res.json(msj);
 };

