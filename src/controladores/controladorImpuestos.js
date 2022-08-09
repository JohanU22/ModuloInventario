const { validationResult } = require('express-validator');
const modeloImpuesto = require('../modelos/modeloImpuestos');
const { Op } = require('sequelize');
const msjRes = require('../componentes/mensaje');

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
        //msj.mensaje='Debe escribir todos los campos';
    }
    return msj;
};
exports.Inicio = async (req, res)=>{
    var msj = validacion(req);
    const listaModulos = 
    [
        { 
            modulo: "Impuestos", 
            rutas: [
                {
                    ruta: "/modulo/impuestos",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Inicio del módulo de impuestos"
                },
                { 
                    ruta: "/modulo/impuestos/listar",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Lista todos los impuestos"
                },
                {   
                    ruta: "/modulo/impuestos/guardar",
                    metodo: "post",
                    parametros:
                        {   
                            idimpuesto: "Id del impuesto (Autoincremental)",
                            nombre: "Nombre del impuesto. Obligatorio",
                            valor: "El valor del impuesto. Decimal. Obligatorio.",
                        },
                    descripcion: "Guarda los datos del impuesto"
                },
                {   
                    ruta: "/modulo/impuestos/modificar",
                    metodo: "put",
                    parametros:
                        {   
                            idimpuesto: "Id del impuesto. Obligatorio. (Query)",
                            nombre: "Nombre del impuesto. Obligatorio (Body)",
                            valor: "El valor del impuesto. Decimal. Obligatorio. (Body)",
                        },
                    descripcion: "Modifica los datos del impuesto"
                },
                {   
                    ruta: "/modulo/impuestos/eliminar",
                    metodo: "delete",
                    parametros:
                        {   
                            idimpuesto: "Id del impuesto. Obligatorio. (Query)",
                        },
                    descripcion: "Elimina los datos del impuesto"
                }
            ],
        }          
    ];
    const datos = {
        api: "API-SIFCON Modulo de Inventario (Impuestos)",
        descripcion: "Interfaz de progamación para el sistema de facturacion contable",
        propiedad: "DESOFIW",
        desarrollador: "Johan Urbina",
        colaboradores: "",
        fecha: "4/06/2022",
        listaModulos
    };
    msj.datos=datos;
    msjRes(res, 200, msj);
};

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

