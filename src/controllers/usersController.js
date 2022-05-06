const {users} = require ('../data')

module.exports = {
    login: (req, res) => {
        res.render('users/login')
    },
    register: (req, res) => {
        res.render('users/register')
    },
    processRegister: (req, res) => {
        let lastId = 0;
        getUsers.forEach( user => {
            if(user.id > lastId){
                lastId = user.id
            }
        });
        let { nombre, apellido, email, pass } = req.body;

const usersController = {
    login: (req,res) => res.render('users/login'),
    register: (req,res) => res.render('users/registro')}







module.exports = usersController;
