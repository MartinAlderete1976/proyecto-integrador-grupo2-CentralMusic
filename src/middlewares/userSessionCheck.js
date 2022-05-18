const userSessionCheck = (req, res, next) => {
    if(req.session.userLogged){
        next();
    }else{
        res.redirect('/users/login');
    }
}

module.exports = userSessionCheck;