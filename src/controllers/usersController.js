const {users, writeUsers} = require ('../data');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const usersController = {
    login: (req,res) => {
        res.render('users/login', {
            user: req.session.userLogged
        })
    },
    processLogin: (req, res) => {
        const errors = validationResult(req); // traigo los errores del body

        

        
        if(errors.isEmpty()){
            // inicia sesion
            let userLogged = users.find(user => user.email === req.body.email); // guardo el usuario que conincide con el mail
            
            req.session.userLogged = {
                id: userLogged.id,
                user: userLogged.user,
                name: userLogged.name,
                emai: userLogged.email,
                avatar: userLogged.avatar,
                category: userLogged.category
            }
            
            if(req.body.remember){
                res.cookie('centralMusic', req.body.email, { maxAge: (1000 * 60) * 20 });
            }
            
            res.locals.userLogged = req.session.userLogged

            

            res.redirect('/users/profile')
            

        }else{
            res.render('users/login', {
                errors: errors.mapped(),
                old: req.body,
                user: req.session.userLogged
            });
        }

        
    },
    register: (req,res) => {
        res.render('users/register', {
            user: req.session
        })
        
    },
    processRegister: (req, res) => {
        
       const errors = validationResult(req);

       

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
                password: bcrypt.hashSync(req.body.password, 10),
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
               user: req.session.userLogged
           })
       }
       
    },

    profile: (req, res) => {
        
       
        res.render('users/profile', {
            user: req.session.userLogged,
        })

    },

    logout: (req, res) => {

        res.clearCookie('centralMusic');
        req.session.destroy();
        res.redirect('/')

    },


}





module.exports = usersController;