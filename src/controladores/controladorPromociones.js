const { validationResult } = require('express-validator');             
const modeloPromociones = require('../modelos/modelosPromociones')
//LISTAR
exports.Listar = async(req, res) => {                                 
    try {                                                              
        const lista = await modeloPromociones.findAll();                    
        console.log(lista);                                                 
        res.json(lista);                                               
    } catch (error) {
        console.error(error);
        res.json(error);                                               
    }  
     res.json(msj);
};
//Guardar
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
        const{id, productos_Codigo, inicio, fin, creado, modificado} = req.body;
        const buscarid = await modeloPromociones.findOne({    //Aqui agregamos el await (revisarlo)
            where: {
                id: id
            }
        });

        if(buscarid == id){
            msj.mensaje = 'El id ya existe';
        }
        else{
            try{
                await modeloPromociones.create(
                    {
                        id: id,
                        productos_Codigo: productos_Codigo,
                        inicio: inicio,
                        fin: fin,
                        creado: creado,
                        modificado: modificado

                });
                msj.mensaje = 'Registro almacenado en Promociones';
            }
            catch(error){
                //msj.mensaje = 'Error al guardar los datos';
                console.log(error)
            }
        }

    }

    res.json(msj);
};


exports.modificar = async (req, res) => {
    const validaciones = validationResult(req);     
    console.log(validaciones.errors );                         
    const msj ={
        mensaje: ''
    };
    if(validaciones.errors.length>0){                      
           validaciones.errors.forEach(element => {
               msj.mensaje+=element.msg + '.';                   
           });
    }
    else{
        const { id } = req.query;
        const { productos_Codigo } = req.body;          
        try {
            var  buscarid = await modeloPromociones.findOne({     
                where:{
                    id: id
                }
            });
            if(!buscarid){
                msj.mensaje='El id registro no existe';
            }
            else{               
                buscarProducto.productos_Codigo=productos_Codigo;                                
                await buscarProducto.save();                                                 
                msj.mensaje='Registro actualizado';
            }                      
        } catch (error) {
            msj.mensaje= 'ERROR  al actualizar los datos';
        }        
    }                       
    res.json(msj);                                                
};

exports.Eliminar = async (req, res) => {           
    const validaciones = validationResult(req);      
    console.log(validaciones.errors );                        
    const msj ={
        mensaje: ''
    };
    if(validaciones.errors.length>0){                     
           validaciones.errors.forEach(element => {
               msj.mensaje+=element.msg + '.';                    
           });
    }
    else{
        const { id } = req.query;
        try {
            var  buscarid = await modeloPromociones.findOne({     
                where:{
                    id: id
                }
            });
            if(!buscarid){
                msj.mensaje='El id registro no existe';
            }
            else{               
                await modeloPromociones.destroy({
                    where:{
                        id : id
                    }
                });                                                 
                msj.mensaje='Registro Eliminado';
            }                      
        } catch (error) {
            msj.mensaje= 'ERROR  al eliminar los datos';
        }        
    }                       
    res.json(msj);         
};