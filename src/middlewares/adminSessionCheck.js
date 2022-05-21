const adminSessionCheck = (req, res, next) => {
    if( req.session.userLogged && req.session.userLogged.category === 'admin'){
        next()
    }else{
        res.send('No tienes permisos para ingresar');

    }

   
}


module.exports = adminSessionCheck;