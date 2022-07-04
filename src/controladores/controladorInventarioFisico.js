const { validationResult } = require('express-validator');
const InventarioFisico = require('../modelos/InventarioFisico');
const Inventario = require('../modelos/ModeloInventario');
const Producto = require('../modelos/ModeloProductos');
const { Op } = require('sequelize');
const msjRes = require('../componentes/mensaje');

//Funciones #######################################################
function validacion (req){
    const validaciones = validationResult(req);
    var errores = [];
    var error = {mensaje: '',parametro: '',};
    var msj = {estado: 'correcto',mensaje: 'Peticion ejecutada correctamente',datos: '',errores: ''};
    
    if(validaciones.errors.length > 0){
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

//Inicio #######################################################
exports.Inicio = async (req, res)=>{
    var msj = validacion(req);
    const listaModulos = [
        { 
            modulo: "InventarioFisico", 
            rutas: [
                {
                    ruta: "/api/InventarioFisico",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Inicio del módulo de InventarioFisico"
                },
                { 
                    ruta: "/api/InventarioFisico/listar",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Lista todos los InventarioFisico"
                },
                { 
                    ruta: "/api/InventarioFisico/id",
                    metodo: "get",
                    parametros:{
                        id: "Codigo del Inventario fisico de tipo entero. Obligatorio."
                    },
                    descripcion: "Lista los datos del Inventario fisico"
                },
                {   
                    ruta: "/api/InventarioFisico/guardar",
                    metodo: "post",
                    parametros:{
                            productos_Codigo: "Codigo del un producto registrado (debe ser numerico y entero), Obligatorio",
                            inventarios_id:"Codigo de un inventario registrado (longitud maxima: 15 caracteres), Obligatorio",
                            cantidadactual: "Cantidad actual en inventario (debe ser valor numerico), Obligatorio",
                            cantidadsistema: "Cantidad en sistema (debe ser valor numerico), Obligatorio",
                            costo: "Costo por producto (debe ser valor numerico), Obligatorio",
                            precio: "precio del producto (debe ser valor numerico), Obligatorio",
                            
                            /* //Otros parametros (usa default/generados por script)

                            fechahora: "Fecha de registro",       //DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
                            balanceexistencia: "",      //DOUBLE GENERATED ALWAYS AS ((`cantidadsistema` - `cantidadactual`)) VIRTUAL,
                            faltante: "",       //GENERATED ALWAYS AS ((case when (`balanceexistencia` < 0) then (`balanceexistencia` * `precio`) when (`balanceexistencia` >= 0) then 0 end)) STORED,
                            sobrante: "",        //GENERATED ALWAYS AS ((case when (`balanceexistencia` > 0) then (`balanceexistencia` * `precio`) when (`balanceexistencia` <= 0) then 0 end)) STORED,
                            */
                        },
                    descripcion: "Guarda los datos del Inventario Fisico"
                },
                {   
                    ruta: "/api/InventarioFisico/modificar",
                    metodo: "put",
                    parametros:{
                        id: "Codigo del un inventario fisico registrado (debe ser numerico y entero), Obligatorio",
                        productos_Codigo: "Codigo del un producto registrado (debe ser numerico y entero), Obligatorio",
                        inventarios_id:"Codigo de un inventario registrado (longitud maxima: 15 caracteres), Obligatorio",
                        cantidadactual: "Cantidad actual en inventario (debe ser valor numerico), Obligatorio",
                        cantidadsistema: "Cantidad en sistema (debe ser valor numerico), Obligatorio",
                        costo: "Costo por producto (debe ser valor numerico), Obligatorio",
                        precio: "precio del producto (debe ser valor numerico), Obligatorio",
                        
                        /* //Otros parametros (usa default/generados por script)

                        fechahora: "Fecha de registro",       //DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
                        balanceexistencia: "",      //DOUBLE GENERATED ALWAYS AS ((`cantidadsistema` - `cantidadactual`)) VIRTUAL,
                        faltante: "",       //GENERATED ALWAYS AS ((case when (`balanceexistencia` < 0) then (`balanceexistencia` * `precio`) when (`balanceexistencia` >= 0) then 0 end)) STORED,
                        sobrante: "",        //GENERATED ALWAYS AS ((case when (`balanceexistencia` > 0) then (`balanceexistencia` * `precio`) when (`balanceexistencia` <= 0) then 0 end)) STORED,
                        */
                        },
                    descripcion: "Modifica los datos del Inventario Fisico"
                },
                {   
                    ruta: "/api/InventarioFisico/eliminar",
                    metodo: "id",
                    parametros:
                        {
                            id: "Numero id del Inventario Fisico",
                        },
                    descripcion: "Elimina el Inventario Fisico"
                },
            ],
        }          
    ];
    const datos = {
        api: "API-SIFCON",
        descripcion: "Interfaz de programación para el sistema de inventario",
        propiedad: "DESOFIW",
        desarrollador: "Tec. Eduardo Lopez",
        colaboradores: "",
        fecha: "03/07/2022",
        listaModulos
    };
    msj.datos=datos;
    msjRes(res, 200, msj);
};

//Listar #######################################################
exports.Listar = async (req, res)=>{
    var msj = validacion(req);
    try {
        const lista = await InventarioFisico.findAll({
            attributes: ['id','productos_Codigo','inventarios_id','cantidadactual', 'cantidadsistema','costo','precio','fechahora','balanceexistencia','faltante','sobrante'],
            include: {
                model: Producto,
                attributes:['Nombre'],
            },
        });
        msj.datos= lista;
        msjRes(res, 200, msj);
    } catch (error) {
        console.error(error);
        msj.estado = 'error';
        msj.mensaje = 'La peticion no se ejecuto';
        msj.errores = error;
        msjRes(res, 500, msj);
    }
};

//BuscarId #######################################################
exports.BuscarId = async (req, res)=>{
    var msj = validacion(req);
    const { id } = req.query;
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try {
            const lista = await InventarioFisico.findAll({
                include: {model: Producto,attributes:['Nombre'],},
                where:{id}
            });
            if (lista.length==0){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El id del Inventario Fisico no existe',
                    parametro: 'id',
                };
            }
            else{
                console.log(JSON.stringify(lista, null, ' '));
                msj.datos= lista;
            }
            msjRes(res, 200, msj);
        } catch (error) {
            console.error(error);
            msj.estado = 'error';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = error;
            msjRes(res, 500, msj);
        }
    }        
};

//Guardar #######################################################
exports.Guardar = async (req, res) =>{
    var msj = validacion(req);
    
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        const {productos_Codigo, inventarios_id, cantidadactual, cantidadsistema, costo, precio} = req.body;
        try {
            const buscarInventarioFisico = await InventarioFisico.findOne({where:{inventarios_id: productos_Codigo, inventarios_id: inventarios_id}});
            if(buscarInventarioFisico){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El producto ya existe en el inventario',
                    parametro: 'productos_Codigo',
                };
                msjRes(res, 200, msj);
            }
            else {
                const buscarProducto = await Producto.findOne({where:{id: Codigo}});
                if(!buscarProducto){
                    msj.estado = 'precaucion';
                    msj.mensaje = 'La peticion se ejecuto correctamente';
                    msj.errores={
                        mensaje: 'El Codigo del producto no existe',
                        parametro: 'Codigo',
                    };
                    msjRes(res, 200, msj);
                }
                else{
                    const buscarInventario = await Inventario.findOne({where:{id: id}});
                    if(!buscarInventario){
                        msj.estado = 'precaucion';
                        msj.mensaje = 'La peticion se ejecuto correctamente';
                        msj.errores={
                            mensaje: 'El Codigo del Inventario no existe',
                            parametro: 'id',
                        };
                        msjRes(res, 200, msj);
                    }
                    else{
                        await InventarioFisico.create({
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

//Editar #######################################################
exports.Modificar = async (req, res) =>{
    var msj = validacion(req);
    
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try {
            const { id } = req.query;
            var buscarInventarioFisico = await InventarioFisico.findByPk(id);
            if(!buscarInventarioFisico){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El id del Inventario Fisico no existe',
                    parametro: 'id',
                };
                msjRes(res, 200, msj);
            }
            else{
                await Empleado.update({...req.body},{ where:{id: id}})
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

//Eliminar #######################################################
exports.Eliminar = async (req, res) =>{
    var msj = validacion(req);
    
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try {
            const { id } = req.query;
            var buscarInventarioFisico = await InventarioFisico.findByPk(id);
            if(!buscarInventarioFisico){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El id del Inventario Fisico no existe',
                    parametro: 'id',
                };
                msjRes(res, 200, msj);
            }
            else{
                await InventarioFisico.destroy(
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