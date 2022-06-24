const{ Router } = require ('express');
const controladorProductos=require('../controladores/controladorProductos');
const router = Router ();
router.get('/',controladorProductos.inicio);
router.get('/listarProductos',controladorProductos.listarProductos);
router.post('/guardar',controladorProductos.guardar);
router.put('/modificar',controladorProductos.modificar);
module.exports=router;