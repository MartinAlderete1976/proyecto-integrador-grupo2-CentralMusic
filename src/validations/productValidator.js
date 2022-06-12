const {check, body} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

let addProductValidate = [
    check('product')
        .exists().withMessage('Debe selecconar un producto'),
    check('nameProduct')
        .notEmpty().withMessage('Debe ingresar nombre del producto'),
    check('marca')
        .exists().withMessage('Debe seleccionar una marca'),
    check('line')
        .notEmpty().withMessage('Debe ingresar linea'),
     check('hand')
        .notEmpty().withMessage('Debe ingresar la orientacion'),
    check('price')
        .notEmpty().withMessage('Debe ingresar precio'),
    check('color')
        .notEmpty().withMessage('Debe ingresar color'),
    check('materialBody')
        .notEmpty().withMessage('Debe ingresar tipo de madera del cuerpo'),
    check('materialFretboard')
        .notEmpty().withMessage('Debe ingresar el material de diapason'),
    check('bodyFinish')
        .notEmpty('bodyFinish').withMessage('Debe ingresar el acabado de la guitarra'),
    check('image')
        .custom((value, {req}) => {
            if(!(req.files.length > 0)){
                return Promise.reject('Imagenes requeridas')
            }
            return true;
        }),

    check('strings')
        .notEmpty().withMessage('Debe ingresar cantidad de cuerdas'),
    check('tension')
        .notEmpty().withMessage('Debe ingresar la tension'),
    check('material')
        .notEmpty().withMessage('Debe ingresar tipo de material'),
    check('calibre')
        .notEmpty().withMessage('Debe ingresar calibre'),
        
    check('vocal')
        .notEmpty().withMessage('Debe ingresar si es vocal o no'),
    check('efectos')
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
        
    check('inputIn')
        .notEmpty().withMessage('Debe ingresar entrada'),
    check('inputOut')
        .notEmpty().withMessage('Debe ingresar salida'),
    check('large')
        .notEmpty().withMessage('Debe ingresar largo de cable')        

                     
]

module.exports = addProductValidate;