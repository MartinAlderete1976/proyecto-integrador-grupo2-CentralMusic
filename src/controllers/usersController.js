const{getUsers, writeUsers } = require('../data')

module.exports = {
    login: (req,res)  => {
         res.render('users/login')
    },

    register: (req,res)  => {
         res.render('users/register')
    },
    processRegister: (req,res)  => {
         let lastId = 0;
         getUsers.forEach(user => {
              if(user.id > lastId){
                   lastId = user.id
              }
              
         });

         let newUser = {
              id: lastId +1,
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
              avatar: req.file ? req.file.filename : ""

         }

         getUsers.push(newUser)

         writeUsers(getUsers)



              
}

    
}

