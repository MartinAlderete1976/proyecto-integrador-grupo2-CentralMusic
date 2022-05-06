const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const upload = require('../middlewares/uploadAvatar')


router.get('/login', usersController.login);
router.get('/register', usersController.register);
router.post('/registro', upload.single('avatar'), userController.processRegister)


module.exports = router;