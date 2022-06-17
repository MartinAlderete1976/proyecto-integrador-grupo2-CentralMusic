const {check, body} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

let pedalValidator = [
    check('vocal')
    .notEmpty().withMessage('Debe ingresar si es vocal o no'),
check('efects')
    .notEmpty().withMessage('Debe ingresar cantidad de efectos'),
check('instruments')
    .notEmpty().withMessage('Debe ingresar instrumentos compatibles'),
check('typeEfect')
    .notEmpty().withMessage('Debe ingresar tipo de efecto'),
check('voltaje')
    .notEmpty().withMessage('Debe ingresar el voltaje'),
check('technology')
    .notEmpty().withMessage('Debe ingresar la tecnologia'),
check('feeding')
    .notEmpty().withMessage('Debe ingresar alimentacion'),    
]

module.exports = pedalValidator