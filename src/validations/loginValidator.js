const { check, body } = require ('express-validator');
const db = require('../database/models')
const bcrypt = require('bcryptjs');

let validateLogin = [
    
    check('email')
        .notEmpty().withMessage('Ingresar email').bail()
        .isEmail().withMessage('ingresa un email valido').bail()
        .custom((value, { req }) => {
            return db.User.findOne({
                where: {
                    email: req.body.email,
                }
            }).then(user => {
                if(bcrypt.compareSync(req.body.password, user.password)){
                    return Promise.reject()
                }
            })
            .catch(error => {
                return Promise.reject('Email o contraseña incorrecto')
            })
    }),    
    check('password')
        .notEmpty().withMessage('Ingrese su contraseña')
        .isLength({ min: 6 }).withMessage('Contraseña invalida'),
            
        
]

module.exports = validateLogin;