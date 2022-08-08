const express = require('express');
const morgan = require('morgan');
const path  = require('path');
require('dotenv').config();//esto tiene que estar antes de iniciar el servidor (es el paquete para correo)
const app = express();
app.set('port',3002);
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/modulo/productos', require('./rutas/rutasProductos'));
app.use('/modulo/Tipoproductos', require('./rutas/rutasTipoproductos'));
app.use('/modulo/impuestos', require('./rutas/rutasImpuestos'));
app.use('/modulo/promociones', require('./rutas/rutasPromociones'));
//app.use('/modulo/productoprooveedores', require('./rutas/rutasProductosProveedores'));


//app.use('/api/', require('./rutas'));
//app.use('/inventario/productos', require('./rutas/rutasProductos'));
app.listen(app.get('port'), () => {
    console.log("Servidor iniciado en el puerto " + app.get('port'));
})