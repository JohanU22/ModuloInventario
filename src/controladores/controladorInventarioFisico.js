const { validationResult } = require('express-validator');
const modeloInventarioFisico = require('../modelos/modeloInventarioFisico');
const { Op } = require('sequelize');

exports.Listar = async (req, res) => {
    try{
        const lista = await modeloInventarioFisico.findAll();//findOne()
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
        const{id, productos_Codigo, inventarios_id, cantidadactual, cantidadsistema, costo, precio, fechahora, balanceexistencia, faltante, sobrante} = req.body;
        const buscarid = await modeloProducto.findOne({
            where: {
                id: id
            }
        });

        if(buscarid == id){
            msj.mensaje = 'El id ya existe';
        }
        else{
            try{
                await modeloProducto.create(
                    {
                        id: id,
                        productos_Codigo: productos_Codigo,
                        inventarios_id: inventarios_id,
                        cantidadactual: cantidadactual,
                        cantidadsistema: cantidadsistema,
                        costo: costo,
                        precio: precio,
                        fechahora: fechahora,
                        balanceexistencia: balanceexistencia,
                        faltante: faltante,
                        sobrante: sobrante,
                });
                msj.mensaje = 'Registro almacenado en Inventario Fisico';
            }
            catch(error){
                //msj.mensaje = 'Error al guardar los datos';
                console.log(error)
            }
        }
    }
    res.json(msj);
};