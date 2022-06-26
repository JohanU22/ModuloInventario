const { validationResult } = require('express-validator');
const modeloProducto = require('../modelos/modeloProductos');
const { Op } = require('sequelize');

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