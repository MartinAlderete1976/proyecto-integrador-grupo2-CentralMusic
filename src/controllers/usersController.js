const {users} = require ('../data')


const usersController = {
    login: (req,res) => res.render('users/login'),
    register: (req,res) => res.render('users/registro')}







module.exports = usersController;