
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const uploadFile = require('../middlewares/uploadAvatar');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const userInSessionCheck = require('../middlewares/userInSessionCheck');
const userSessionCheck = require('../middlewares/userSessionCheck')


// GET - renderiza vista login 
router.get('/login', userInSessionCheck, usersController.login);
// POST - loguea al usuario
router.post('/login', loginValidator, usersController.processLogin);
// GET - Renderiza vista registro
router.get('/register', usersController.register);
// POST - Crea un nuevo usuario
router.post('/register', uploadFile.single('avatar'), registerValidator, usersController.processRegister);

router.get('/profile', userSessionCheck, usersController.profile);
// get - logout 
router.get('/logout', usersController.logout);



module.exports = router;