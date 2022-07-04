const { validationResult } = require('express-validator');             
const modeloPromociones = require('../modelos/modeloPromociones');
const { Op } = require('sequelize');
const msjRes = require('../componentes/mensaje');
const Promocion = require('../modelos/modeloPromociones');
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
            modulo: "promociones",
            rutas:[
                {
                ruta: "/api/promociones",
                metodo: "get",
                parametros:"",
                descripcion: "Inicio del modulo promociones"
                },
                //listar
                {
                    ruta: "/api/promociones/listar",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Lista los registros del modulo promociones"
                    },
                //guardar
                {
                    ruta: "/api/promociones/guardar",
                    metodo: "post",
                    parametros:{
                       productos_Codigocol: "El ingreso del codigo delproducto. Tipo STRING",
                       inicio: "Fecha  de ingreso del registro del producto. Tipo DATE. Formato(AAAA-MM-DD HH:MM:SS)",
                       inicio: "Fecha  de ingreso del registro del producto . Tipo DATE. Formato(AAAA-MM-DD HH:MM:SS)",
                       fin: "Fecha  de fin del registro del producto. Tipo DATE. Formato(AAAA-MM-DD HH:MM:SS)",
                       creado: "Fecha que fue creado el registro del producto. Tipo DATE.",
                       modificado: "Fecha que fue modificado el registro del producto. Tipo DATE.",
                    },
                    descripcion: "Guarda registros del modulo de promociones"
                    },
                //modificar
                {
                    ruta: "/api/promociones/editar",
                    metodo: "put",
                    parametros:{
                        productos_Codigocol: "El ingreso del codigo delproducto. Tipo STRING",
                        inicio: "Fecha  de ingreso del registro del producto. Tipo DATE. Formato(AAAA-MM-DD HH:MM:SS)",
                        inicio: "Fecha  de ingreso del registro del producto . Tipo DATE. Formato(AAAA-MM-DD HH:MM:SS)",
                        fin: "Fecha  de fin del registro del producto. Tipo DATE. Formato(AAAA-MM-DD HH:MM:SS)",
                        creado: "Fecha que fue creado el registro del producto. Tipo DATE.",
                        modificado: "Fecha que fue modificado el registro del producto. Tipo DATE.", 
                    },
                    descripcion: "Modifica registros del modulo de promociones"
                    },
                //eliminar
                {
                    ruta: "/api/promociones/eliminar",
                    metodo: "delete",
                    parametros:{
                        id: "Identificador del modulo de promociones. Nota: Campo obligatorio."
                    },
                    descripcion: "Elimina registros del modulo de promociones"
                    },     
            ],
        }
    ];
    const datos = {
        api: "Modulo promociones",
        descripcion: "Interfaz de programación del modulo de promociones",
        propiedad: " ",
        desarrollador: "Marcela Barahona",
        colaboradores: "",
        fecha: "03/07/2022",
        listaModulos
    };
    msj.datos=datos;
    msjRes(res, 200, msj);
};

//LISTAR
exports.Listar = async (req, res) => {
    var msj = {
        mensaje: ''
    }
    try {
        
        const Lista = await modeloPromociones.findAll();
        console.log(Lista);
        res.json(Lista);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
};
//id
exports.BuscarId = async (req, res)=>{
    var msj = validacion(req);
    const { id } = req.query;
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        try {
            const lista = await modeloPromociones.findAll({
                include: {
                    model: Promocion,
                    attributes:['productos_Codigocol'],
                },
                where:{
                    id
                }
            });
            if (lista.length==0){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'El id del empleado no existe',
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
//filtro
exports.BuscarFiltro = async (req, res)=>{
    var msj = validacion(req);
    const { id } = req.query;
    if (msj.errores.length > 0){
        msjRes(res, 200, msj);
    }
    else{
        const filtro = '%' + req.query.filtro + '%';
        const limite = req.query.limite;
        try {
            const lista = await modeloPromociones.findAll({
                include: {
                    model: Promocion,
                    attributes:['productos_Codigocol'],
                },
                where:{
                    [Op.or]:[
                        {productos_Codigocol: {[Op.like]: filtro}},                   
                    ]
                },
                limit: 10,
            });
            if (lista.length==0){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion se ejecuto correctamente';
                msj.errores={
                    mensaje: 'No existe ningun empleado con esta informacion',
                    parametro: 'filtro',
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
        const {id, productos_Codigocol , inicio, fin, creado, modificado} = req.body;

        try {
            await modeloPromociones.create(
                {   
                    id:id,
                    productos_Codigocol: productos_Codigocol,
                    inicio: inicio,
                    fin: fin,
                    creado: creado,
                    modificado: modificado
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
        const {  productos_Codigocol, inicio, fin, creado, modificado } = req.body;

        try {
            var buscarPromocion = await modeloPromociones.findOne({
                where:{
                    id:id
                }
            });
           
            if (!buscarPromocion) {
                msj.mensaje = 'El id del inventario no existe'
                
            }else{
                buscarPromocion.productos_Codigocol = productos_Codigocol;
                buscarPromocion.inicio = inicio;
                buscarPromocion.fin = fin;
                buscarPromocion.creado = creado ;
                buscarPromocion.modificado = modificado;
                await buscarPromocion.save(); 
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
            var buscarPromocion = await modeloPromociones.findOne({
                where:{
                    id:id
                }
            });
           
            if (!buscarPromocion) {
                msj.mensaje = 'El id del inventario no existe'
                
            }else{                
                await modeloPromociones.destroy({
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




