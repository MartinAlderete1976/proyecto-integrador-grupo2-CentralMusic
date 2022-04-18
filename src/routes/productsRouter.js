const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// ruta que me muestra todo el listado de guitarras
router.get('/guitars', productsController.guitars);
// ruta para mostar todos los accesorios
router.get('/accesories', productsController.accesories);
// detalle de producto
router.get('/detail/:id', productsController.detail);







module.exports = router;