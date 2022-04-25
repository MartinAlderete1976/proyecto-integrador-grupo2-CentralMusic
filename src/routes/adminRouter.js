const express = require('express');
const router = express.Router();
const adminProductsController = require('../controllers/admin/adminProductsController');


//CRUD de productos

//GET - Lista de productos 
router.get('/products', adminProductsController.list);
//GET - detalle de producto vista admin
router.get('/product/detail/:id', adminProductsController.detail);
//GET envia vista de formulario para agregar un producto
router.get('/products/add', adminProductsController.add);






module.exports = router;