const { validationResult } = require('express-validator');
const modeloProductoProveedores = require('../modelos/modeloProductosProveedores');
const { Op } = require('sequelize');

exports.Listar = async (req, res) => {
    try{
        const lista = await modeloProductoProveedores.findAll();//findOne()
        console.log(lista);
        res.json(lista);
    }
    catch(error){
        console.error(error);
        res.json(error);
    }
};