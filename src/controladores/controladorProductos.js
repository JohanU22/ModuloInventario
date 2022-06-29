const { validationResult } = require('express-validator');
const modeloProducto = require('../modelos/modeloProductos');


exports.Listar = async (req, res) => {
    try{
        const lista = await modeloProducto.findAll();//findOne()
        console.log(lista);
        res.json(lista);
    }
    catch(error){
        console.error(error);
        res.json(error);
    }

};
exports.Guardar = async (req,res) =>{
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
    else{
        const{Codigo, Nombre, Descripcion, TipoProducto, Existencia, Precio, Costo, CantidadMinima, exento, Habilitado, tipo2, orden, impuestov, impuestoValor, ultimo, nombreImagen, idprincipal, cantidadprincipal,idusuario, movimiento} = req.body;
        const buscarCodigo = await modeloProducto.findOne({    //Aqui agregamos el await (revisarlo)
            where: {
                Codigo: Codigo
            }
        });

        if(buscarCodigo == Codigo){
            msj.mensaje = 'El codigo ya existe';
        }
        else{
            try{
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
            catch(error){
                //msj.mensaje = 'Error al guardar los datos';
                console.log(error)
            }
        }

    }

    res.json(msj);
};