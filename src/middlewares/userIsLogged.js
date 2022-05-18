const {users, writeUsers} = require ('../data');

const userIsLogged = (req, res, next) => {
    res.locals.userIsLogged = false;

    
    let emailInCookie = req.cookies.centralMusic; //req.cookie.userEmail es la cookie que setie en el userController
    let userFromCookie = users.find(user => user.email === emailInCookie);
    
    if(userFromCookie){
        res.locals.userIsLogged = userFromCookie;
    }

    
    if(req.session.userLogged){
        res.locals.userIsLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }


    next();
}

module.exports = userIsLogged;