const { validationResult } = require('express-validator');
const modeloTipoproductos = require('../modelos/modeloTipoProductos');
const { Op } = require('sequelize');
const msjRes = require('../components/mensaje');

function validacion(req){
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
    const listaModulos = [
        {
            modulo: "Tipoproducto", 
            rutas:[
                {
                    ruta: "/modulo/tipoproductos",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Inicio del módulo de Tipos de productos"
                },
                { 
                    ruta: "/modulo/tipoproductos/listar",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Lista todos los tipos productos"
                },
                { 
                    ruta: "/modulo/tipoproductos/id",
                    metodo: "get",
                    parametros:{
                        Codigo: "Identificador del tipo producto de tipo entero. Obligatorio."
                    },
                    descripcion: "Lista los datos del  tipoproducto"
                },
                {   
                    ruta: "/modulo/tipoproductos/filtro",
                    metodo: "get",
                    parametros: {
                        filtro: "Tipo producto al que pertenese el producto. Obligatorio."
                    },
                    descripcion: "Lista los tipos de producto que cumplen el criterio de busqueda"
                },
                {   
                    ruta: "/modulo/tipoproductos/guardar",
                    metodo: "post",
                    parametros:
                        {
                            NombreTipo: "Nombre del tipo de producto.",
                            DescripcionTipo: "Guarda los datos del tipo producto. Obligatorio",
                            orden:"Orden del tipo de  producto",
                            idtipoprincipal: "Debemos ingresar el id del tipo de producto",
                            nombreImagen: "ingresamos el nombre de la imagen del tipo de producto",

                        },
                    descripcion: "Guarda los datos de los tipos de producto"
                },
                {   
                    ruta: "/modulo/tipoproductos/modificar",
                    metodo: "put",
                    parametros:
                        {
                            CodigoTipo: "Nos muestra el id unico de cada tipo de producto",
                            NombreTipo: "Nombre del tipo de producto.",
                            DescripcionTipo: "Guarda los datos del tipo producto. Obligatorio",
                            orden:"Orden del tipo de  producto",
                            idtipoprincipal: "Debemos ingresar el id del tipo de producto",
                            nombreImagen: "ingresamos el nombre de la imagen del tipo de producto",
                            
                        },
                    descripcion: "Modifica los datos del producto"
                },
                {   
                    ruta: "/modulo/tipoproductos/eliminar",
                    metodo: "id",
                    parametros:
                        {
                            CodigoTipo: "Numero de identificación del tipo producto",
                        },
                    descripcion: "Elimina el tipo de producto"
                },

            ],
        }
    ];
    const datos = {
        api: "MODULO INVENTARIO",
        descripcion: "Modulo Inventario para el sistema de gestion de restaurantes",
        propiedad: "Movil 2",
        desarrollador: "Edgardo Rojas",
        colaboradores: "",
        fecha: "19/05/2022",
        listaModulos
    };
    msj.datos=datos;
    msjRes(res, 200, msj);
};

exports.Listar = async (req, res) => {
    var msj = validacion(req);
    try {
        const lista = await modeloTipoproductos.findAll();//findOne()
        //console.log(lista);
        //res.json(lista);
        msj.datos = lista; //esto lo puse despues
        msjRes(res, 200, msj); //esto lo puse despues
    }
    catch (error) {
        console.error(error);
        msj.estado = 'error';
        msj.mensaje = 'La peticion no se ejecuto';
        msj.errores = error;
        msjRes(res, 500, msj);
    }

};

exports.BuscarId = async (req, res)=>{
    var msj = validacion(req);
    const { CodigoTipo } = req.query;
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try {
            const {CodigoTipo} = req.query;
            const buscarCodigoTipo = await modeloTipoproductos.findOne({
                attributes:['CodigoTipo', 'NombreTipo', 'DescripcionTipo', 'orden', 'idtipoprincipal', 'nombreImagen'],
                where:{
                    CodigoTipo
                }
            });
            if (!buscarCodigoTipo){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El Codigo del producto no existe',
                    parametro: 'CodigoTipo',
                };
            }
            else{
                //console.log(JSON.stringify(lista, null, ' '));
                msj.datos= buscarCodigoTipo;
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

exports.BuscarFiltro = async (req, res)=>{
    var msj = validacion(req);

    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try {
            var { filtro } = req.query;
            filtro = '%'+filtro+'%' ;
            const buscarTipoproducto = await modeloTipoproductos.findOne({
                attributes: ['CodigoTipo','NombreTipo','DescripcionTipo','orden', 'idtipoprincipal', 'nombreImagen'],
                where:{
                    [Op.or]:{
                        NombreTipo: {[Op.like]: filtro}
                    }
                }
            });
            if(!buscarTipoproducto){
                msj.estado = 'Precaución';
                msj.mensaje = 'La petición se ejecutó correctamente';
                msj.errores={
                    mensaje: 'No existen tipos de productos con estos parametros',
                    parametro: 'filtro',
                };
            }
            else{
                msj.datos=buscarTipoproducto;
            }
            msjRes(res, 200, msj);
        } catch (error) {
            msj.estado = 'Error';
            msj.mensaje = 'La petición no se ejecutó';
            msj.errores = error;
            msjRes(res, 500, msj);
        }
    }
};

exports.Guardar = async (req, res) => {
    var msj = validacion(req);
    if(msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        const { CodigoTipo, NombreTipo, DescripcionTipo, orden, idtipoprincipal, nombreImagen  } = req.body;
       try{
        const buscarCodigoTipo = await modeloTipoproductos.findOne({where:{CodigoTipo: CodigoTipo}});
        if(buscarCodigoTipo){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El CodigoTipo ya existe',
                    parametro: 'CodigoTipo',
                };
                msjRes(res, 200, msj);
        }
        else{
            await modeloTipoproductos.create({
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
       catch (er){
        console.error(er);
            msj.estado = 'error';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = er;
            msjRes(res, 500, msj);
       }

    }
};

exports.Modificar = async (req, res) => {
    var msj = validacion(req);

    if(msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try{
            const { CodigoTipo } = req.query;
            var buscarCodigoTipo = await modeloTipoproductos.findByPk(CodigoTipo);
            if(!buscarCodigoTipo){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El CodigoTipo del tipo producto no existe',
                    parametro: 'CodigoTipo',
                };
                msjRes(res, 200, msj);
            }
            else{
                await modeloTipoproductos.update(
                    {...req.body},
                    { where:{CodigoTipo: CodigoTipo}})
                    .then((data) => {
                        msj.datos = data;
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
        }
        catch(error){
            msj.estado = 'error';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = error;
            msjRes(res, 500, msj);
        }
    }
};

exports.Eliminar = async(req, res)=> {
    var msj = validacion(req);
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try{
            const { CodigoTipo } = req.query;
            var buscarTipoproductos = await modeloTipoproductos.findByPk(CodigoTipo);
            if(!buscarTipoproductos){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El CodigoTipo del producto no existe',
                    parametro: 'CodigoTipo',
            };
            msjRes(res, 200, msj);

            }
            else{
                await modeloTipoproductos.destroy(
                    {where: {CodigoTipo: CodigoTipo}})
                    .then ((data)=> {
                        msj.datos= data;
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
            catch(error){
            msj.estado = 'error';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = error;
            msjRes(res, 500, msj);
        }

    }

};

