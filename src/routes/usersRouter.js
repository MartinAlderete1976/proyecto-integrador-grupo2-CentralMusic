let express = require('express');
let router = express.Router();
let { login, register } = require('../controllers/usersControler')

router.get('/login',  login);
router.get('/register', register)


module.exports = router;