const db = require('../database/models')

const userIsLogged = (req, res, next) => {
    
    res.locals.userIsLogged = false;
    if(req.cookies.centralMusic){
        req.session.userLogged = req.cookies.centralMusic;
        
    }
    if(req.session.userLogged){
        res.locals.userIsLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    
    
    console.log(res.locals.userLogged)

    next()
   

   

}

module.exports = userIsLogged;