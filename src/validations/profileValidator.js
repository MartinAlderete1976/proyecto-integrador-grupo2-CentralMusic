const {check, body} = require('express-validator');
const db = require('../database/models');

const profileValidator = [
check('name')
    .notEmpty().withMessage('Debes ingresar un nombre').bail(),
check('lastname')
    .notEmpty().withMessage('Debes ingresar tu apellido').bail(),

]

module.exports = profileValidator;