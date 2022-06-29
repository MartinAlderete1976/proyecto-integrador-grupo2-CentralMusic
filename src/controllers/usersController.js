const {users, writeUsers} = require ('../data');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const fs = require('fs');
const path = require('path');


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
                    lastname: userLogged.last_name,
                    email: userLogged.email,
                    avatar: userLogged.avatar,
                    user_rol_id: userLogged.user_rol_id,
                }

                if(req.body.remember){
                    res.cookie('centralMusic', req.session.userLogged, { maxAge: (1000 * 60) * 20 });
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
        
        db.User.findOne({
            where: {
                id: req.session.userLogged.id
            }
        })
        .then((user) => {
            res.render('users/profile', {
                user,
                session: req.session.userLogged
            })
        })
        

    },

    editProfile: (req, res) => {

        db.User.findByPk(req.session.userLogged.id)
            .then(user => {
                res.render('users/editProfile', {
                    user,
                    session: req.session,
                })
            })
            .catch(error => console.log(error))
        
    },

    updateProfile: (req, res) => {
        let errors = validationResult(req);
        //return res.send(errors)
        if(errors.isEmpty()){
           //return res.send(req.file)
            if(req.file !== undefined){   
                db.User.findOne({
                    where: {
                        id: req.session.userLogged.id,
                    }
                })
                .then(user => {

                    if(user.avatar === 'avatar-default.png'){
                        db.User.update({
                            name: req.body.name,
                            last_name: req.body.lastname,
                            avatar: req.file.filename,
                         }, {
                            where: {
                                id: req.session.userLogged.id
                            }
                        })
                        .then(() => {
                            
                             res.clearCookie('centralMusic');
                             db.User.findOne({
                                 where: {
                                     email: req.session.userLogged.email
                                 }
                             })
                             .then(userLogged => {
                                 req.session.userLogged = {
                                     id: userLogged.id,
                                     user: userLogged.user,
                                     name: userLogged.name,
                                     lastname: userLogged.last_name,
                                     email: userLogged.email,
                                     avatar: userLogged.avatar,
                                     user_rol_id: userLogged.user_rol_id,
                                 }
                                 res.redirect('/users/profile')
                             })
                            .catch(error => console.log(error))
                        })
                        .catch(error => console.log(error))
                    }else{
                        //return  res.send(user.avatar)
                    if (fs.existsSync(path.join(__dirname, `../../public/images/avatars/${user.avatar}`))) {
                        fs.unlinkSync(path.join(__dirname, `../../public/images/avatars/${user.avatar}`))
                    } else {
                        console.log('-- no se encontro el archivo')
                    }
                    db.User.update({
                        name: req.body.name,
                        last_name: req.body.lastname,
                        avatar: req.file.filename,
                     }, {
                        where: {
                            id: req.session.userLogged.id
                        }
                    })
                    .then(() => {
                        
                         res.clearCookie('centralMusic');
                         db.User.findOne({
                             where: {
                                 email: req.session.userLogged.email
                             }
                         })
                         .then(userLogged => {
                             req.session.userLogged = {
                                 id: userLogged.id,
                                 user: userLogged.user,
                                 name: userLogged.name,
                                 lastname: userLogged.last_name,
                                 email: userLogged.email,
                                 avatar: userLogged.avatar,
                                 user_rol_id: userLogged.user_rol_id,
                             }
                             res.redirect('/users/profile')
                         })
                        .catch(error => console.log(error))
                    })
                    .catch(error => console.log(error))
                    }

                    
                })
                .catch(error => console.log(error))
                
            }else{
                db.User.update({
                    name: req.body.name,
                    last_name: req.body.lastname,
                    avatar: req.session.userLogged.avatar,
                 }, {
                    where: {
                        id: req.session.userLogged.id
                    }
                })
                .then(() => {
                    
                     res.clearCookie('centralMusic');
                     db.User.findOne({
                         where: {
                             email: req.session.userLogged.email
                         }
                     })
                     .then(userLogged => {
                         req.session.userLogged = {
                             id: userLogged.id,
                             user: userLogged.user,
                             name: userLogged.name,
                             lastname: userLogged.last_name,
                             email: userLogged.email,
                             avatar: userLogged.avatar,
                             user_rol_id: userLogged.user_rol_id,
                         }
                         res.redirect('/users/profile')
                     })
                    .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
            }

            
        } else {
            db.User.findOne({
                where: {
                    id: req.session.userLogged.id
                }
            })
            .then((user) => {
                res.render('users/editProfile', {
                    user,
                    session: req.session,
                    errors: errors.mapped()
                })
            })
        }

    },


    deleteUser: (req, res) => {

        db.User.findOne({
            where: {
                id: req.params.id,
            }
        })
        .then(user => {
            if(user.avatar === 'avatar-default.png'){
                db.User.destroy({
                    where: {
                        id: req.params.id,
                    }
                })
                .then(() => {
                    res.clearCookie('centralMusic');
                    req.session.destroy();
                    res.redirect('/')
                })
                .catch(error => console.log(error))
            } else {
                if (fs.existsSync(path.join(__dirname, `../../public/images/avatars/${user.avatar}`))) {
                    fs.unlinkSync(path.join(__dirname, `../../public/images/avatars/${user.avatar}`))
                } else {
                    console.log('-- no se encontro el archivo')
                }
                db.User.destroy({
                    where: {
                        id: req.params.id,
                    }
                })
                .then(() => {
                    res.clearCookie('centralMusic');
                    req.session.destroy();
                    res.redirect('/')
                })
                .catch(error => console.log(error))

            }
        })
        .catch(error => console.log(error))

    },

    logout: (req, res) => {

        res.clearCookie('centralMusic');
        req.session.destroy();
        res.redirect('/')

    },


}





module.exports = usersController;