const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;



app.use(express.static(path.join(__dirname, 'public')));

// routes 

app.get('/', (req, res) => {
    let home = path.join(__dirname, '/views/index.html');
    res.sendFile(home);
});


app.get('/login', (req, res) => {
    let login = path.join(__dirname, '/views/login.html');
    res.sendFile(login);
});

app.get('/register', (req, res) => {
    let register = path.join(__dirname, '/views/registro.html');
    res.sendFile(register);
});

app.get('/details', (req, res) => {
    let detailsProduct = path.join(__dirname, '/views/detailsProduct.html');
    res.sendFile(detailsProduct);
});





app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));