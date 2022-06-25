const {check, body} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

let pedalValidator = [
    check('nameProduct')
        .notEmpty().withMessage('Debe ingresar nombre del producto'),
    check('marca')
        .notEmpty().withMessage('Debe seleccionar una marca'),    
    check('vocal')
        .notEmpty().withMessage('Debe ingresar si es vocal o no'),
    check('efects')
        .notEmpty().withMessage('Debe ingresar cantidad de efectos'),
    check('price')
        .isNumeric().withMessage('Debe ser numeros')
        .notEmpty().withMessage('Debe ingresar precio'),    
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
    check('image')
        .custom((value, {req}) => {
            if(!(req.files.length > 0)){
                return Promise.reject('Imagenes requeridas')
            }
            return true;
        }),
       
    check('description')
        .notEmpty().withMessage('Debe ingresar una descripcion')             
]

module.exports = pedalValidator