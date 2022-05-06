const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');


// GET - renderiza vista login 
router.get('/login', usersController.login);
// POST - loguea al usuario
router.post('/login', usersController.processLogin);
// GET - Renderiza vista registro
router.get('/register', usersController.register);
// POST - Crea un nuevo usuario
router.post('/register', usersController.processRegister);
// get - logout 
router.get('/logout', usersController.logout);



module.exports = router;