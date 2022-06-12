const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController')
const adminProductsController = require('../controllers/admin/adminProductsController');
const uploadFile = require('../middlewares/uploadProductImage'); //middleware para poder subir archivos
const adminSessionCheck = require('../middlewares/adminSessionCheck');


// admin index
router.get('/', /*adminSessionCheck,*/ adminController.index);



//CRUD de productos

//GET - Lista de productos 
router.get('/products', /*adminSessionCheck,*/ adminProductsController.list);
//GET - detalle de producto vista admin
router.get('/product/detail/:id', /*adminSessionCheck,*/ adminProductsController.detail);
//GET envia vista de formulario para agregar una guitarra
router.get('/products/add', /*adminSessionCheck,*/ adminProductsController.addProduct);
//POST - Crea guitarra en la DB
router.post('/products', uploadFile.single('image'), adminProductsController.productCreate);

//GET envia la vista de edicion de guitarra
router.get('/products/guitar/edit/:id', /*adminSessionCheck,*/ adminProductsController.editGuitar);
//PUT - actualiza producto en al DB
router.put('/products/:id', uploadFile.single('image'), adminProductsController.updateGuitar);

//GET envia vista de formulario para agregar un accesorio
router.get('/products/accesory/add', /*adminSessionCheck,*/ adminProductsController.addAccesory);
//POST - Crea accesorio en la DB
router.post('products', uploadFile.single('image'), adminProductsController.createAccesory)
//GET envia la vista de edicion del accesorio
router.get('/products/accesory/edit/:id', /*adminSessionCheck,*/ adminProductsController.editAccesory);
//PUT - actualiza accesorio en al DB
router.put('/products/:id', uploadFile.single('image'), adminProductsController.updateAccesory);

/* DELETE - Elimina un producto */
router.delete('/products/delete/:id', adminProductsController.delete)






module.exports = router;