const { check, body } = require('express-validator');
const {users} = require('../data');

let validateRegister = [
    check('user')
        .notEmpty().withMessage('Debes ingresar un usuario').bail()
        .isLength({ min: 5}).withMessage('ingrese un usuario valido')
        .custom((value) => {
            let user = users.find(user => user.user === value);
            if(user){
                return false;
            }
            return true
        }).withMessage('Usuario no disponible'),
    check('name')
        .notEmpty().withMessage('Debes ingresar un nombre').bail(),
    check('lastname')
        .notEmpty().withMessage('Debes ingresar tu apellido').bail(),
    check('email')
        .notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Debes ingresar un email valido'),
    check('email').custom((value) => {
        let email = users.find(email => email.email === value);
        if(email){
            return false;
        }
        return true;
    }).withMessage('Email ya registrado'),
    check('password')
        .notEmpty().withMessage('Debes ingresar una contraseña').bail()
        .isLength({ min: 6 }).withMessage('Contraseña debe ser mas larga'),
    check('password2')
        .notEmpty().withMessage('Reingrese su contraseña').bail(),
    body('password2').custom((value, { req }) => {
        if(value !== req.body.password){
            return false;
        }
        return true;
    }).withMessage('Las contraseñas no coinciden'),
    check('terms')
        .isString('on').withMessage('Debes aceptar los terminos y condiciones')    
        
]

module.exports = validateRegister;