const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController')
const adminProductsController = require('../controllers/admin/adminProductsController');

// admin index
router.get('/', adminController.index);



//CRUD de productos

//GET - Lista de productos 
router.get('/products', adminProductsController.list);
//GET - detalle de producto vista admin
router.get('/product/detail/:id', adminProductsController.detail);
//GET envia vista de formulario para agregar una guitarra
router.get('/products/guitar/add', adminProductsController.addGuitar);
//POST - Crea guitarra en la DB
router.post('/products', adminProductsController.createGuitar);
//GET envia la vista de edicion de guitarra
router.get('/products/guitar/edit/:id', adminProductsController.editGuitar);
//PUT - actualiza producto en al DB
router.put('/products/:id', adminProductsController.updateGuitar);

//GET envia vista de formulario para agregar un accesorio
router.get('/products/accesory/add', adminProductsController.addAccesory);
//POST - Crea accesorio en la DB
router.post('products', adminProductsController.createAccesory)
//GET envia la vista de edicion del accesorio
router.get('/products/accesory/edit/:id', adminProductsController.editAccesory);
//PUT - actualiza accesorio en al DB
router.put('/products/:id', adminProductsController.updateAccesory);

/* DELETE - Elimina un producto */
router.delete('/products/delete/:id', adminProductsController.delete)






module.exports = router;