const {check, body} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

let cuerdaValidator = [
    check('nameAccesory')
        .notEmpty().withMessage('Debe ingresar nombre del producto'),
    check('marcaAccesory')
        .notEmpty().withMessage('Debe seleccionar una marca'),
    check('strings')
        .notEmpty().withMessage('Debe ingresar cantidad de cuerdas'),
    check('tension')
        .notEmpty().withMessage('Debe ingresar la tension'),
    check('material')
        .notEmpty().withMessage('Debe ingresar tipo de material'),
    check('calibre')
        .notEmpty().withMessage('Debe ingresar calibre'),
    check('priceAccesory')
        .isNumeric().withMessage('Debe ser numeros')
        .notEmpty().withMessage('Debe ingresar precio'),
    check('imageAccesory')
        .custom((value, {req}) => {
            if(!(req.files)){
                return Promise.reject('Imagenes requeridas')
            }
            return true;
        }),
       
    check('descriptionAccesory')
        .notEmpty().withMessage('Debe ingresar una descripcion')      
]

module.exports = cuerdaValidator;