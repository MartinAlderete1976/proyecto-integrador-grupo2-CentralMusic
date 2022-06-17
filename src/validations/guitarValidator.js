const {check, body} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

let guitarValidator = [
    
    check('nameProduct')
        .notEmpty().withMessage('Debe ingresar nombre del producto'),
    check('marca')
        .notEmpty().withMessage('Debe seleccionar una marca'),
    check('model')
        .notEmpty().withMessage('campo requerido'),    
    check('line')
        .notEmpty().withMessage('Debe ingresar linea'),
     check('hand')
        .notEmpty().withMessage('Debe ingresar la orientacion'),
    check('price')
        .isNumeric().withMessage('Debe ser numeros')
        .notEmpty().withMessage('Debe ingresar precio'),
    check('color')
        .notEmpty().withMessage('Debe ingresar color'),
    check('materialBody')
        .notEmpty().withMessage('Debe ingresar tipo de madera del cuerpo'),
    check('materialFretboard')
        .notEmpty().withMessage('Debe ingresar el material de diapason'),
    check('bodyFinish')
        .notEmpty().withMessage('Debe ingresar el acabado de la guitarra'),
    check('image')
        .custom((value, {req}) => {
            if(!(req.files)){
                return Promise.reject('Imagenes requeridas')
            }
            return true;
        }),
       
    check('description')
        .notEmpty().withMessage('Debe ingresar una descripcion')    
  

   
        
   
        /*
    check('inputIn')
        .notEmpty().withMessage('Debe ingresar entrada'),
    check('inputOut')
        .notEmpty().withMessage('Debe ingresar salida'),
    check('large')
        .notEmpty().withMessage('Debe ingresar largo de cable')        

                     */
]

module.exports = guitarValidator;