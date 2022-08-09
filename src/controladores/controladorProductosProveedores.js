const { validationResult } = require('express-validator');
const modeloProductoProveedores = require('../modelos/modeloProductosProveedores');
const { Op } = require('sequelize');
const msjRes = require('../componentes/mensaje');
const ProductoProveedor = require('../modelos/modeloProductosProveedores');

//Función de Validación
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

//Modulo de Inicio
exports.Inicio = async (req, res)=>{
    var msj = validacion(req);
    const listaModulos = 
    [
        { 
            modulo: "ProductosProveedores", 
            rutas: [
                {
                    ruta: "/modulo/productosproveedores/inicio",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Inicio del módulo de productoproveedores"
                },
                { 
                    ruta: "/modulo/productosproveedores/listar",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Lista todos los datos ingresados en productoproveedor"
                },
                {   
                    ruta: "/modulo/productosproveedores/guardar",
                    metodo: "post",
                    parametros:
                        {
                            idproducto: "Llave foranea de la tabla producto. Obligatorio",
                            idproveedor: "Llave foranea de la tabla proveedor. Obligatorio",
                        },
                    descripcion: "Guarda los datos en la tabla productoproveedor"
                },
                {   
                    ruta: "/modulo/productosproveedores/modificar",
                    metodo: "put",
                    parametros:
                        {
                            id: "Identificador de la tabla productoproveedor, de tipo entero. Obligatorio.",
                            idproducto: "Llave foranea de la tabla producto. Obligatorio",
                            idproveedor: "Llave foranea de la tabla proveedor. Obligatorio",
                        },
                    descripcion: "Actualiza los datos de la tabla productoproveedor"
                },
                {   
                    ruta: "/modulo/productosproveedores/eliminar",
                    metodo: "delete",
                    parametros:
                        {
                            id: "Identificador de la tabla productoproveedor, de tipo entero. Obligatorio."
                        },
                    descripcion: "Elimina los datos de la tabla productoproveedor"
                },
            ],
        }          
    ];

    const datos = {
        api: "API-SIFCON",
        descripcion: "Interfaz de progamación para el sistema de gestión de restaurantes",
        propiedad: "DESOFIW",
        desarrollador: "Grupo 4",
        colaboradores: "Grupo 4",
        fecha: "HOY",
        listaModulos
    };
    msj.datos=datos;
    msjRes(res, 200, msj);
};

//Modulo de Listar
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

//Modulo de Guardar
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

//Modulo de Editar
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

//Modulo de Eliminar
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

 //Modulo Buscar ID
 exports.BuscarId = async (req, res)=>{
    var msj = validacion(req);
    
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try {
            const { id } = req.query;
            const buscarProductoProveedor = await modeloProductoProveedores.findOne({
                where:{
                    id
                }
            });
            if(!buscarProductoProveedor){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El id del usuario no existe',
                    parametro: 'id',
                };
            }
            else{
                msj.datos= buscarProductoProveedor;
            }
            msjRes(res, 200, msj);
        } catch (er) {
            msj.estado = 'precaucion';
            msj.estado = 'error';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = er;
            msjRes(res, 500, msj);
        }
    }
};

//BuscarFiltro
/*
exports.BuscarFiltro = async (req, res)=>{
    var msj = validacion(req);
    
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try {
            var { filtro } = req.query;
            filtro= '%'+filtro+'%';
            const buscarProductoProveedor = await modeloProductoProveedores.findAll({
                attributes: ['id','idproducto','idproveedor'],
                where:{
                    [Op.or]:{
                        idproducto: {[Op.like]: filtro},
                    }
                }
            });
            if(!buscarProductoProveedor){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'No existen usuarios con estos parametros',
                    parametro: 'filtro',
                };
            }
            else{
                msj.datos=buscarProductoProveedor;
            }
            msjRes(res, 200, msj);
        } catch (error) {
            msj.estado = 'error';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = error;
            msjRes(res, 500, msj);
        }
    }
};
*/