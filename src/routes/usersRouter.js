const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const uploadFile = require('../middlewares/uploadAvatar');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const profileValidator = require('../validations/profileValidator')
const userInSessionCheck = require('../middlewares/userInSessionCheck');
const userSessionCheck = require('../middlewares/userSessionCheck')


// GET - renderiza vista login 
router.get('/login', userInSessionCheck, usersController.login);
// POST - loguea al usuario
router.post('/login', loginValidator, usersController.processLogin);
// GET - Renderiza vista registro
router.get('/register', userInSessionCheck, usersController.register);
// POST - Crea un nuevo usuario
router.post('/register', uploadFile.single('avatar'), registerValidator, usersController.processRegister);

router.get('/profile', userSessionCheck, usersController.profile);

router.get('/profile/edit', userSessionCheck, usersController.editProfile)

router.put('/profile',uploadFile.single('avatar'), userSessionCheck, profileValidator, usersController.updateProfile)

router.delete('/profile/delete/:id', usersController.deleteUser)
// get - logout 
router.get('/logout', usersController.logout);



module.exports = router;