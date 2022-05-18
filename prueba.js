const bcrypt = require('bcryptjs');



let password = '123456';

let password1 = '123456';

let passEncriptada = bcrypt.hashSync(password, 10);

let passEncriptada1 = bcrypt.hashSync(password1, 10);

if(passEncriptada == passEncriptada1){
    console.log('son iguales')
}else{
    console.log('no son iguales')
}

