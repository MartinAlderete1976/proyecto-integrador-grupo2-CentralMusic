const {users, writeUsers} = require ('../data');
const { validationResult } = require('express-validator');

const usersController = {
    login: (req,res) => res.render('users/login'),
    processLogin: (req, res) => {
        res.send(req.body)
    },
    register: (req,res) => res.render('users/register'),
    processRegister: (req, res) => {
        
       const errors = validationResult(req)

       

       if(errors.isEmpty()){
           // si no hay errores crear el usuario

            let lastId = 0;
            users.forEach(user => {
                if(user.id > lastId){
                    lastId = user.id
                }
            });

            let newUser = {
                id: lastId + 1,
                user: req.body.user,
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                avatar: req.file? req.file.filename: 'avatar-default.png',
                category: 'costumer',

            }

            users.push(newUser);

            writeUsers(users);

            res.redirect('/users/login');
       }else{
           //codigo para mostar errores
           res.render('users/register', {
               errors: errors.mapped(),
               old: req.body,
           })
       }
       
    },
    logout: (req, res) => {

    }


}





module.exports = usersController;