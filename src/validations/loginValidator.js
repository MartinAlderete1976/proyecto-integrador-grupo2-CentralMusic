const { check, body } = require ('express-validator');
const {users} = require('../data');
const bcrypt = require('bcryptjs');

let validateLogin = [
    
    check('email')
        .notEmpty().withMessage('Ingresar email').bail()
        .isEmail().withMessage('ingresa un email valido').bail()
        .custom((value, { req }) => {
            let userInDb = users.find(user => user.email === req.body.email);
            if(userInDb){
                let passwordOk = bcrypt.compareSync(req.body.password, userInDb.password);
                if(passwordOk){
                    return true;
                
                }
            }
            return false;
    }).withMessage('Email o contraseña incorrectos'),    
    check('password')
        .notEmpty().withMessage('Ingrese su contraseña')
        .isLength({ min: 6 }).withMessage('Contraseña invalida'),
            
        
]

module.exports = validateLogin;