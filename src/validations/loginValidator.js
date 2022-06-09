const { check, body } = require('express-validator');
const {users} = require('../data');

let validateLogin = [
    check("email")
        .notEmpty().withMessage("E-mail es requerido").bail()
        .isEmail().withMessage("Ingrese un e-mail válido"),
    body("custom").custom((value, { req })=>{
        let user = users.find(user => user.email === req.body.email);
        if(user.pass === req.body.pass){
            return true;
        }
        return false;
    }).withMessage("E-mail o contraseña incorrecto"),
    check("password")
        .notEmpty().withMessage("Ingrese una contraseña"),
];

module.exports = validateLogin;