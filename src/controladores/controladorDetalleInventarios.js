const { validationResult } = require('express-validator');
const modeloDetalleInventarios = require('../modelos/modeloDetalleInventarios')
const { Op } = require('sequelize');
const msjRes = require('../componentes/mensaje');
const { DOUBLE } = require('sequelize');

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
//Inicio
exports.Inicio = async (req, res)=>{
    var msj = validacion(req);
    const listaModulos =
     [
        {
            modulo: "DetalleInventarios",
            rutas:[
                {
                ruta: "/modulo/DetalleInventarios",
                metodo: "get",
                parametros:"",
                descripcion: "Inicio del modulo detalle Inventarios"
                },
                //listar
                {
                    ruta: "/modulo/DetalleInventarios/listar",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Lista datos del modulo detalle Inventarios"
                    },
                //guardar
                {
                    ruta: "/modulo/DetalleInventarios/guardar",
                    metodo: "post",
                    parametros:{
                        fisico: "ingreso fisico de detalle inventario. tipo de dato double",
                        ultimo: 'ingreso de ultimo detalle inventario. tipo de dato double',
                        ingreso: 'ingreso del producto al inventario. tipo de dato double',
                        egreso: 'egreso del producto del inventario. tipo de dato double',
                        precio: "precio de detalle inventarios. tipo de dato double",
                        productos_Codigo: "llave foranea de la tabla productos. Campo obligatorio",
                         inventarios_id: "llave foranea de la tabla inventarios. Campo obligatorio",

                    },
                    descripcion: "Guarda datos del modulo detalle Inventarios"
                    },
                //modificar
                {
                    ruta: "/modulo/DetalleInventarios/modificar",
                    metodo: "put",
                    parametros:{
                        fisico: "ingreso fisico de detalle inventario. tipo de dato double",
                        ultimo: 'ingreso de ultimo detalle inventario. tipo de dato double',
                        ingreso: 'ingreso del producto al inventario. tipo de dato double',
                        egreso: 'egreso del producto del inventario. tipo de dato double',
                        precio: "precio de detalle inventarios. tipo de dato double",
                        productos_Codigo: "llave foranea de la tabla productos. Campo obligatorio",
                         inventarios_id: "llave foranea de la tabla inventarios. Campo obligatorio",
                    },
                    descripcion: "Modifica datos del modulo detalle Inventarios"
                    },
                //eliminar
                {
                    ruta: "/modulo/DetalleInventarios/eliminar",
                    metodo: "delete",
                    parametros:{
                        id: "Identificador del Detalle Inventarios de tipo entero. Obligatorio."
                    },
                    descripcion: "Elimina datos del modulo detalle Inventarios"
                    },
                    
            ]

        }
    ];
    const datos = {
        api: "Modulo Inventario",
        descripcion: "Interfaz de programación del modulo detalle Inventarios",
        propiedad: " ",
        desarrollador: "Miguel Solorzano",
        colaboradores: "",
        fecha: "05/06/2022",
        listaModulos
    };
    msj.datos=datos;
    msjRes(res, 200, msj);
  
};

//Buscar ID
exports.BuscarId = async (req, res)=>{
    var msj = validacion(req);

    if(msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try{
            const {id} = req.query;
            const BuscarDetalleInventarios = await modeloDetalleInventarios.findOne({
                attributes: ['id','precio', 'productos_Codigo', 'inventarios_id'],
                where:{
                    id
                }

            });
            if(!BuscarDetalleInventarios){
                msj.estado = '!Precaucion!';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El id del usuario no existe',
                    parametro: 'id',
                };
            }
            else{
                msj.datos = BuscarDetalleInventarios;
            }
            msjRes(res, 200, msj);

            } catch(er){
                 msj.estado = 'error';
                msj.mensaje = 'La peticion no se ejecuto correctamente';
                 msj.errores = er;
                msjRes(res, 500, msj);
            }
    }
};

//Buscar Filtro
exports.BuscarFiltro = async (req, res)=>{
var msj = validacion(req);

if(msj.errores.length > 0){
    msjRes(res, 200, msj);
}
    else{
        try {
            var { filtro } = req.query;
            filtro= ''+filtro+'';
            const BuscarDetalleInventarios = await modeloDetalleInventarios.findAll({
                attributes: ['id','precio', 'productos_Codigo', 'inventarios_id'],
                where:{
                    [Op.or]:{
                        precio: {[Op.like]: filtro}
                       
                    }
                }
            });
            if(!BuscarDetalleInventarios){
                msj.estado = '!Precaucion!';
                msj.mensaje = 'La peticion no se ejecuto correctamente';
                msj.errores={
                    mensaje: 'No existen ingresos con esos parametros',
                    parametro: 'filtro',
                };
        }
            else{
                msj.datos=BuscarDetalleInventarios;
            }
            msjRes(res, 200, msj);

    }catch (error) {
        msj.estado = 'error';
        msj.mensaje = 'La peticion no se ejecuto';
        msj.errores = error;
        msjRes(res, 500, msj);
    }
        }
};



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
        const { fisico, ultimo, ingreso, egreso, precio, productos_Codigo, inventarios_id} = req.body;

        try {
            var BuscarDetalleInventarios = await modeloDetalleInventarios.findOne({
                where:{
                    id : id
                }
            });
           
            if (!BuscarDetalleInventarios) {
                msj.mensaje = 'El id del registro no existe'
                
            }else{
                BuscarDetalleInventarios.fisico = fisico;
                BuscarDetalleInventarios.ultimo = ultimo;
                BuscarDetalleInventarios.ingreso = ingreso;
                BuscarDetalleInventarios.egreso = egreso;
                BuscarDetalleInventarios.precio = precio;
                BuscarDetalleInventarios.productos_Codigo = productos_Codigo;
                BuscarDetalleInventarios.inventarios_id = inventarios_id;
                await BuscarDetalleInventarios.save(); 
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