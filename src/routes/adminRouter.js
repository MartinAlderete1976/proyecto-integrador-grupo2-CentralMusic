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
//GET envia vista de formulario para agregar un producto
router.get('/products/add', adminProductsController.add);
//POST - Crea un producto en la DB
router.post('/products', adminProductsController.create);
//GET envia la vista de edicion de producto
router.get('/products/edit/:id', adminProductsController.edit);
//PUT - actualiza producto en al DB
router.put('/products/:id', adminProductsController.update);





module.exports = router;