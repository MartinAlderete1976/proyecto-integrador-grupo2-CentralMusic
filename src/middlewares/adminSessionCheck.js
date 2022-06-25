const adminSessionCheck = (req, res, next) => {
    if( req.session.userLogged && req.session.userLogged.user_rol_id === 2){
        next()
    }else{
        res.send('No tienes permisos para ingresar');

    }

   
}


module.exports = adminSessionCheck;