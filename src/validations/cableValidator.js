const {check} = require('express-validator');

const cableValidator = [
    check('nameProduct')
        .notEmpty().withMessage('Debe ingresar nombre del producto'),
    check('marca')
        .notEmpty().withMessage('Debe seleccionar una marca'),
    check('inputIn')
        .notEmpty().withMessage('Debe ingresar entrada'),
    check('inputOut')
        .notEmpty().withMessage('Debe ingresar salida'),
    check('large')
        .notEmpty().withMessage('Debe ingresar largo de cable'),
    check('price')
        .isNumeric().withMessage('Debe ser numeros')
        .notEmpty().withMessage('Debe ingresar precio'),
    check('image')
        .custom((value, {req}) => {
            if(!(req.files.length > 0)){
                return Promise.reject('Imagenes requeridas')
            }
            return true;
        }),
       
    check('description')
        .notEmpty().withMessage('Debe ingresar una descripcion')      
];

module.exports = cableValidator;