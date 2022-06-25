const {users, writeUsers} = require ('../data');
const db = require('../database/models')

const userIsLogged = (req, res, next) => {
    
    
    /*
    if(req.cookies.centralMusic){
        req.session.userLogged = req.cookies.centralMusic;
        res.locals.userLogged = req.session.userLogged;
        res.locals.userIsLogged = true
        console.log(req.session.userLogged,)
    }    
    next()*/

    
    let emailInCookie = req.cookies.centralMusic; //req.cookie.userEmail es la cookie que setie en el userController
    let userFromCookie; // = users.find(user => user.email === emailInCookie);
    
    if(emailInCookie){
        db.User.findOne({
            where: {
                email: emailInCookie
            }
        })
        .then(user => {
            userFromCookie = user.dataValues;
            res.locals.userIsLogged = false;
            if(userFromCookie){
                req.session.userLogged = userFromCookie;
            
            }
        
            if(req.session.userLogged){
                res.locals.userIsLogged = true;
                res.locals.userLogged = req.session.userLogged;
                console.log(req.session)
                
            }
           
        
        
        })
        .catch(error => console.log(error))
       
    }

    console.log(userFromCookie)
    
    console.log(res.locals.userIsLogged)

    
    next()
    
   

   

}

module.exports = userIsLogged;