const {users, writeUsers} = require ('../data');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

const usersController = {
    login: (req,res) => {
        res.render('users/login', {
            user: req.session.userLogged,
            session: req.session,
        })
    },
    processLogin: (req, res) => {
        const errors = validationResult(req); // traigo los errores del body

        

        
        if(errors.isEmpty()){
            // inicia sesion
            
            db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(userLogged => {
                req.session.userLogged = {
                    id: userLogged.id,
                    user: userLogged.user,
                    name: userLogged.name,
                    email: userLogged.email,
                    avatar: userLogged.avatar,
                    user_rol_id: userLogged.user_rol_id,
                }

                if(req.body.remember){
                    res.cookie('centralMusic', req.body.email, { maxAge: (1000 * 60) * 20 });
                }
                
                res.locals.userLogged = req.session.userLogged
    
                res.redirect('/users/profile')
            })
    
        }else{
            res.render('users/login', {
                errors: errors.mapped(),
                old: req.body,
                user: req.session.userLogged,
                session: req.session,
            });
        }

        
    },
    register: (req,res) => {
        res.render('users/register', {
            user: req.session.userLogged,
            session: req.session,
        })
        
    },
    processRegister: (req, res) => {
        
       const errors = validationResult(req);

       

       if(errors.isEmpty()){
           // si no hay errores crear el usuario
           db.User.create({
               user: req.body.user,
               name: req.body.name,
               last_name: req.body.lastname,
               email: req.body.email,
               password:  bcrypt.hashSync(req.body.password, 10),
               avatar: req.file ? req.file.filename : 'avatar-default.png',
               user_rol_id: 1,
           })
           .then(user => {
               res.redirect('/users/login')
           })
           .catch(error => res.send(error))
           
       }else{
           //codigo para mostar errores
           res.render('users/register', {
               errors: errors.mapped(),
               old: req.body,
               session: req.session,
               user: req.session.userLogged
           })
       }
       
    },

    profile: (req, res) => {
        
       
        res.render('users/profile', {
            user: req.session.userLogged,
            session: req.session
        })

    },

    logout: (req, res) => {

        res.clearCookie('centralMusic');
        req.session.destroy();
        res.redirect('/')

    },


}





module.exports = usersController;