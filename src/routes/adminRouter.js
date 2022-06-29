const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController')
const adminProductsController = require('../controllers/admin/adminProductsController');
const guitarValidator = require('../validations/guitarValidator')
const pedalValidator = require('../validations/pedalValidator')
const cuerdaValidator = require('../validations/cuerdaValidator')
const cableValidator = require('../validations/cableValidator');
const uploadFile = require('../middlewares/uploadProductImage'); //middleware para poder subir archivos
const adminSessionCheck = require('../middlewares/adminSessionCheck');


// admin index
router.get('/', adminSessionCheck, adminController.index);
router.get('/guitars', adminSessionCheck, adminController.guitars)
router.get('/accesories', adminSessionCheck, adminController.accesories)
router.get('/pedals', adminSessionCheck,adminController.pedals)
router.get('/cables', adminSessionCheck, adminController.cables)




//CRUD de productos

//GET - Lista de productos 
router.get('/products', adminSessionCheck, adminProductsController.list);
//GET - detalle de producto vista admin
router.get('/product/detail/:id', adminSessionCheck, adminProductsController.detail);
//GET envia vista de formulario para agregar una guitarra
router.get('/products/guitar/add', adminSessionCheck, adminProductsController.addGuitar);
//POST - Crea guitarra en la DB
router.post('/guitars', uploadFile.array('image'), guitarValidator, adminProductsController.createGuitar);

//GET envia la vista de edicion de guitarra
router.get('/products/guitar/edit/:id', adminSessionCheck, adminProductsController.editGuitar);
//PUT - actualiza producto en al DB
router.put('/products/guitar/:id', uploadFile.array('image'), adminProductsController.updateGuitar);

//GET envia vista de formulario para agregar un accesorio
router.get('/products/accesory/add', adminSessionCheck, adminProductsController.addAccesory);
//POST - Crea accesorio en la DB
router.post('/accesories', uploadFile.array('image'), cuerdaValidator, adminProductsController.createAccesory);
//GET envia la vista de edicion del accesorio
router.get('/products/accesory/edit/:id', adminSessionCheck, adminProductsController.editAccesory);
//PUT - actualiza accesorio en al DB
router.put('/products/accesory/:id', uploadFile.array('image'), adminProductsController.updateAccesory);


router.get('/products/pedal/add', adminProductsController.addPedal);
router.post('/pedals',uploadFile.array('image'), pedalValidator, adminProductsController.createPedal);
//GET envia la vista de edicion del pedal
router.get('/products/pedal/edit/:id', adminSessionCheck, adminProductsController.editPedal);
//PUT - actualiza accesorio en al DB
router.put('/products/pedal/:id', uploadFile.array('image'), adminProductsController.updatePedal);




router.get('/products/cable/add', adminProductsController.addCable);
router.post('/cables',uploadFile.array('image'), cableValidator, adminProductsController.createCable);
//GET envia la vista de edicion del cable
router.get('/products/cable/edit/:id', adminSessionCheck, adminProductsController.editCable);
//PUT - actualiza accesorio en al DB
router.put('/products/cable/:id', uploadFile.array('image'), adminProductsController.updateCable);




/* DELETE - Elimina un producto */
router.delete('/products/delete/:id', adminProductsController.delete)






module.exports = router;