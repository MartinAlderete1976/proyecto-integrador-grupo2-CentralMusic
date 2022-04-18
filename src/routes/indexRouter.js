const express = require('express');
const router = express.Router(); // uso middleware de nivel de direccionador
const indexController = require('../controllers/indexController'); /* requiero el controlador que es a donde se va
                                                                    a direccionar el pedido, el controlador contiene toda la logica */


router.get('/', indexController.index); // el nombre de esta ruta "/" se va a concatenar con la que esta en app.js                                                                


// exporto el router para poder requerirlo en app.js
module.exports = router;