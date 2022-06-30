const { validationResult } = require('express-validator');
const modeloProducto = require('../modelos/modeloProductos');
const { Op } = require('sequelize');


exports.Listar = async (req, res) => {
    try {
        const lista = await modeloProducto.findAll();//findOne()
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
        const { Codigo, Nombre, Descripcion, TipoProducto, Existencia, Precio, Costo, CantidadMinima, exento, Habilitado, tipo2, orden, impuestov, impuestoValor, ultimo, nombreImagen, idprincipal, cantidadprincipal, idusuario, movimiento } = req.body;
        const buscarCodigo = await modeloProducto.findOne({    //Aqui agregamos el await (revisarlo)
            where: {
                Codigo: Codigo
            }
        });

        if (buscarCodigo == Codigo) {
            msj.mensaje = 'El codigo ya existe';
        }
        else {
            try {
                await modeloProducto.create(
                    {
                        Codigo: Codigo,
                        Nombre: Nombre,
                        Descripcion: Descripcion,
                        TipoProducto: TipoProducto,
                        Existencia: Existencia,
                        Precio: Precio,
                        Costo: Costo,
                        CantidadMinima: CantidadMinima,
                        exento: exento,
                        Habilitado: Habilitado,
                        tipo2: tipo2,
                        orden: orden,
                        impuestov: impuestov,
                        impuestoValor: impuestoValor,
                        ultimo: ultimo,
                        nombreImagen: nombreImagen,
                        idprincipal: idprincipal,
                        cantidadprincipal: cantidadprincipal,
                        idusuario: idusuario,
                        movimiento: movimiento

                    });
                msj.mensaje = 'Registro almacenado en Productos';
            }
            catch (error) {
                //msj.mensaje = 'Error al guardar los datos';
                console.log(error)
            }
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
        const { Codigo } = req.query;
        const { Nombre, Descripcion, TipoProducto, Existencia, Precio, Costo, CantidadMinima, exento, Habilitado, tipo2, orden, impuestov, impuestoValor, ultimo, nombreImagen, idprincipal, cantidadprincipal, idusuario, movimiento } = req.body;

        try {
            var buscarProducto = await modeloProducto.findOne({
                where: {
                    Codigo: Codigo
                }
            });

            if (!buscarProducto) {
                msj.mensaje = 'El codigo del producto no existe'

            } else {
                buscarProducto.Nombre = Nombre;
                buscarProducto.Descripcion = Descripcion;
                buscarProducto.TipoProducto = TipoProducto;
                buscarProducto.Existencia = Existencia;
                buscarProducto.Precio = Precio;
                buscarProducto.Costo = Costo;
                buscarProducto.CantidadMinima = CantidadMinima;
                buscarProducto.exento = exento;
                buscarProducto.Habilitado = Habilitado;
                buscarProducto.tipo2 = tipo2;
                buscarProducto.orden = orden;
                buscarProducto.impuestov = impuestov;
                buscarProducto.impuestoValor = impuestoValor;
                buscarProducto.ultimo = ultimo;
                buscarProducto.nombreImagen = nombreImagen;
                buscarProducto.idprincipal = idprincipal;
                buscarProducto.cantidadprincipal = cantidadprincipal;
                buscarProducto.idusuario = idusuario;
                buscarProducto.movimiento = movimiento;
                await buscarProducto.save();
                msj.mensaje = 'Registros actualizado';
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
        const { Codigo } = req.query;
        try {
            var buscarProducto = await modeloProducto.findOne({
                where:{
                    Codigo:Codigo
                }
            });
           
            if (!buscarProducto) {
                msj.mensaje = 'El codigo del producto no existe'
                
            }else{                
                await modeloProducto.destroy({
                    where: 
                    {
                        Codigo:Codigo
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
