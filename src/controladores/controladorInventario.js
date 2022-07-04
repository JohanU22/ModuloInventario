const { validationResult } = require('express-validator');
const modeloInventario = require('../modelos/modeloInventario');
const { Op } = require('sequelize');
const msjRes = require('../componentes/mensaje');
const Inventarios = require('../modelos/modeloInventario');
function validacion (req){
    const validaciones = validationResult(req);
    var errores = [];
    var error = {
        mensaje: '',
        parametro: '',
    };
    var msj = {
        estado: 'Correcto',
        mensaje: 'Petición ejecutada correctamente',
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
        msj.estado = 'Precaucion';
        msj.mensaje = 'La petición no se ejecutó';
        msj.errores = errores;
    }
    return msj;
};
exports.Inicio = (req, res)=>{
    var msj = validacion(req);
    const listaModulos =
     [
        {
            modulo: "Inventario",
            rutas:[
                {
                ruta: "/modulo/Inventario",
                metodo: "get",
                parametros:"",
                descripcion: "Inicio del modulo Inventario"
                },
                //listar
                {
                    ruta: "/modulo/Inventario/listar",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Lista los registros del modulo Inventario"
                    },
                //guardar
                {
                    ruta: "/modulo/Inventario/guardar",
                    metodo: "post",
                    parametros:{
                        fechahora: "Fecha y hora de ingreso del registro de inventario. Tipo DATE. Formato(AAAA-MM-DD HH:MM:SS)",
                        faltante: 'Cantidad de articulos faltantes. Tipo DOUBLE',
                        sobrante: 'Cantidad de articulos sobrantes. Tipo DOUBLE',
                        usuarios_idregistro: "Registro perteneciente a la tabla de Usuarios, sirve para identificar el usuario. Tipo INT",
                        estaciones_NumeroEstacion: "Registro perteneciente a la tabla Estaciones, sirve para identificar la estación. Tipo INT",
                    },
                    descripcion: "Guarda registros del modulo Inventario"
                    },
                //modificar
                {
                    ruta: "/modulo/Inventario/editar",
                    metodo: "put",
                    parametros:{
                        fechahora: "Fecha y hora de ingreso del registro de inventario. Tipo DATE. Formato(AAAA-MM-DD HH:MM:SS)",
                        faltante: 'Cantidad de articulos faltantes. Tipo DOUBLE',
                        sobrante: 'Cantidad de articulos sobrantes. Tipo DOUBLE',
                        usuarios_idregistro: "Registro perteneciente a la tabla de Usuarios, sirve para identificar el usuario. Tipo INT",
                        estaciones_NumeroEstacion: "Registro perteneciente a la tabla Estaciones, sirve para identificar la estación. Tipo INT",
                    },
                    descripcion: "Modifica registros del modulo Inventario"
                    },
                //eliminar
                {
                    ruta: "/modulo/Inventario/eliminar",
                    metodo: "delete",
                    parametros:{
                        id: "Identificador del Inventario de tipo entero. Nota: Campo obligatorio."
                    },
                    descripcion: "Elimina registros del modulo Inventario"
                    },     
            ],
        }
    ];
    const datos = {
        api: "Modulo Inventario",
        descripcion: "Interfaz de programación del modulo Inventario",
        propiedad: " ",
        desarrollador: "José Almendarez",
        colaboradores: "",
        fecha: "03/07/2022",
        listaModulos
    };
    msj.datos=datos;
    msjRes(res, 200, msj);
};

exports.BuscarId = async (req, res)=>{
    var msj = validacion(req);
    
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try {
            const { id } = req.query;
            const buscarInventario = await Inventarios.findOne({
                attributes: ['id','fechahora','faltante','sobrante'],
                where:{
                    id
                }
            });
            if(!buscarInventario){
                msj.estado = 'Precaución';
                msj.mensaje = 'La petición se ejecutó correctamente';
                msj.errores={
                    mensaje: 'El id del inventario no existe',
                    parametro: 'id',
                };
            }
            else{
                msj.datos= buscarInventario;
            }
            msjRes(res, 200, msj);
        } catch (er) {
            msj.estado = 'Error';
            msj.mensaje = 'La petición no se ejecutó';
            msj.errores = er;
            msjRes(res, 500, msj);
        }
    }
};

//BuscarFiltro
exports.BuscarFiltro = async (req, res)=>{
    var msj = validacion(req);
    
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try {
            var { filtro } = req.query;
            filtro = '%'+filtro+'%' ;
            const buscarInventario = await Inventarios.findAll({
                attributes: ['id','fechahora','faltante','sobrante'],
                where:{
                    [Op.or]:{
                        fechahora: {[Op.like]: filtro}
                    }
                }
            });
            if(!buscarInventario){
                msj.estado = 'Precaución';
                msj.mensaje = 'La petición se ejecutó correctamente';
                msj.errores={
                    mensaje: 'No existen usuarios con estos parametros',
                    parametro: 'filtro',
                };
            }
            else{
                msj.datos=buscarInventario;
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
