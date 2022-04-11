const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;


// archivos estaticos de uso publico
app.use(express.static(path.join(__dirname, '../public')));

/* Temple engine config */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// routes 

app.get('/', (req, res) => {
    let home = path.join(__dirname, '/views/home/index.ejs');
    res.render(home);
});

app.get('/carrito', (req, res) => {
    let carrito = path.join(__dirname, '/views/products/carrito.ejs');
    res.render(carrito);
});


app.get('/login', (req, res) => {
    let login = path.join(__dirname, '/views/users/login.ejs');
    res.render(login);
});

app.get('/register', (req, res) => {
    let register = path.join(__dirname, '/views/users/registro.ejs');
    res.render(register);
});

app.get('/details', (req, res) => {
    let detailsProduct = path.join(__dirname, '/views/products/detailsProduct.ejs');
    res.render(detailsProduct);
});

app.get('/admin', (req, res) => {
    let addProduct = path.join(__dirname, '/views/admin/products/addProduct.ejs');
    res.render(addProduct);
});

app.get('/admin/productos/list', (req, res) => {
    let listProduct = path.join(__dirname, '/views/admin/products/listProducts.ejs');
    res.render(listProduct);
})



app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));