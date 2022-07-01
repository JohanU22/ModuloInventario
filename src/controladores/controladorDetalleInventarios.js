const { validationResult } = require('express-validator');
const modeloDetalleInventarios = require('../modelos/modeloDetalleInventarios')
const { Op } = require('sequelize');
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
