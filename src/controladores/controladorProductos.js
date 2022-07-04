const { validationResult } = require('express-validator');
const modeloProducto = require('../modelos/modeloProductos');
const modeloTipoproductos = require('../modelos/modeloTipoproductos');
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
            modulo: "Productos", 
            rutas:[
                {
                    ruta: "/modulo/productos",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Inicio del módulo de productos"
                },
                { 
                    ruta: "/modulo/productos/listar",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Lista todos los productos"
                },
                { 
                    ruta: "/modulo/productos/id",
                    metodo: "get",
                    parametros:{
                        Codigo: "Identificador del producto de tipo entero. Obligatorio."
                    },
                    descripcion: "Lista los datos del producto"
                },
                {   
                    ruta: "/modulo/productos/filtro",
                    metodo: "get",
                    parametros: {
                        filtro: "Tipo producto al que pertenese el producto. Obligatorio."
                    },
                    descripcion: "Lista los tipos de producto que cumplen el criterio de busqueda"
                },
                {   
                    ruta: "/modulo/productos/guardar",
                    metodo: "post",
                    parametros:
                        {

                            Nombre: "Nombre del producto. Obligatorio",
                            Descripcion: "Guarda los datos del empleado. Obligatorio",
                            TipoProducto:"Clasifica el tipo de producto. Obligatorio",
                            Existencia:"Nos indica el numero de existencias del producto. Obligatorio",
                            Precio:"Nos muestra el precio del producto. Obligatorio",
                            Costo:"Nos muestra el costo del producto. Obligatorio",
                            CantidadMinima:"Limita cual es la existencia minima del producto. Obligatorio",
                            exento:"Clasifica el producto si esta incluida en el ámbito de aplicacion de impuesto. Obligatorio",
                            Habilitado:"Nos indica si el producto esta habilitado a su venta. Obligatorio",
                            tipo2:"Otros tipo de producto. Obligatorio",
                            orden:"Orden del producto",
                            impuestov:"Numero de impuesto",
                            impuestoValor:"El total del impuesto",
                            ultimo:"version ultima del producto",
                            nombreImagen:"el nombre que lleva la imagen del producto",
                            idprincipal:"El id principal del tipo de producto",
                            cantidadprincipal:"La cantidad concentrada del producto",
                            idusuario:"Nos muestra el id del usuario",
                            movimiento:"No registra el movimiento",

                        },
                    descripcion: "Guarda los datos del producto"
                },
                {   
                    ruta: "/modulo/producto/modificar",
                    metodo: "put",
                    parametros:
                        {
                            Codigo: "Numero de identificación del producto",
                            Nombre: "Nombre del producto. Obligatorio",
                            Descripcion: "Guarda los datos del empleado. Obligatorio",
                            TipoProducto:"Clasifica el tipo de producto. Obligatorio",
                            Existencia:"Nos indica el numero de existencias del producto. Obligatorio",
                            Precio:"Nos muestra el precio del producto. Obligatorio",
                            Costo:"Nos muestra el costo del producto. Obligatorio",
                            CantidadMinima:"Limita cual es la existencia minima del producto. Obligatorio",
                            exento:"Clasifica el producto si esta incluida en el ámbito de aplicacion de impuesto. Obligatorio",
                            Habilitado:"Nos indica si el producto esta habilitado a su venta. Obligatorio",
                            tipo2:"Otros tipo de producto. Obligatorio",
                            orden:"Orden del producto",
                            impuestov:"Numero de impuesto",
                            impuestoValor:"El total del impuesto",
                            ultimo:"version ultima del producto",
                            nombreImagen:"el nombre que lleva la imagen del producto",
                            idprincipal:"El id principal del tipo de producto",
                            cantidadprincipal:"La cantidad concentrada del producto",
                            idusuario:"Nos muestra el id del usuario",
                            movimiento:"No registra el movimiento",
                            
                        },
                    descripcion: "Modifica los datos del producto"
                },
                {   
                    ruta: "/modulo/productos/eliminar",
                    metodo: "id",
                    parametros:
                        {
                            Codigo: "Numero de identificación del producto",
                        },
                    descripcion: "Elimina el producto"
                },

            ],
        }
    ];
    const datos = {
        api: "MODULO INVENTARIO",
        descripcion: "Modulo Inventario para el sistema de gestion de restaurantes",
        propiedad: "Movil 2",
        desarrollador: "Ing. Carlos Flores",
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
        const lista = await modeloProducto.findAll();//findOne()
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
    const { Codigo } = req.query;
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try {
            const {Codigo} = req.query;
            const buscarCodigo = await modeloProducto.findOne({
                attributes:['Codigo', 'Nombre', 'TipoProducto', 'Existencia', 'Precio'],
                where:{
                    Codigo
                }
            });
            if (!buscarCodigo){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El Codigo del producto no existe',
                    parametro: 'Codigo',
                };
            }
            else{
                //console.log(JSON.stringify(lista, null, ' '));
                msj.datos= buscarCodigo;
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
            const buscarProducto = await modeloProducto.findOne({
                attributes: ['Codigo','Nombre','TipoProducto','Existencia', 'Precio'],
                where:{
                    [Op.or]:{
                        Nombre: {[Op.like]: filtro}
                    }
                }
            });
            if(!buscarProducto){
                msj.estado = 'Precaución';
                msj.mensaje = 'La petición se ejecutó correctamente';
                msj.errores={
                    mensaje: 'No existen productos con estos parametros',
                    parametro: 'filtro',
                };
            }
            else{
                msj.datos=buscarProducto;
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
    /*
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
    */

    var msj = validacion(req);
    if(msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        const { Codigo, Nombre, Descripcion, TipoProducto, Existencia, Precio, Costo, CantidadMinima, exento, Habilitado, tipo2, orden, impuestov, impuestoValor, ultimo, nombreImagen, idprincipal, cantidadprincipal, idusuario, movimiento } = req.body;
       try{
        const buscarCodigo = await modeloProducto.findOne({where:{Codigo: Codigo}});
        if(buscarCodigo){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El Codigo ya existe',
                    parametro: 'Codigo',
                };
                msjRes(res, 200, msj);
        }
        else{
            await modeloProducto.create({
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
    /*
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
    */

    var msj = validacion(req);

    if(msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try{
            const { Codigo } = req.query;
            var buscarCodigo = await modeloProducto.findByPk(Codigo);
            if(!buscarCodigo){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El id del producto no existe',
                    parametro: 'id',
                };
                msjRes(res, 200, msj);
            }
            else{
                await modeloProducto.update(
                    {...req.body},
                    { where:{Codigo: Codigo}})
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
    /*

    


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

    */
 
    var msj = validacion(req);

    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try{
            const { Codigo } = req.query;
            var buscarProducto = await modeloProducto.findByPk(Codigo);
            if(!buscarProducto){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El id del producto no existe',
                    parametro: 'Codigo',
            };
            msjRes(res, 200, msj);

            }
            else{
                await modeloProducto.destroy(
                    {where: {Codigo: Codigo}})
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
