const {users} = require ('../data')


const usersController = {
    login: (req,res) => res.render('users/login'),
    processLogin: (req, res) => {
        res.send('viniste por post')
    },
    register: (req,res) => res.render('users/register'),
    processRegister: (req, res) => {
        res.send('viniste por post')
    },
    logout: (req, res) => {

    }


}







module.exports = usersController;