const express = require('express');
const app = express();
const path = require('path');
const process = require('process');
const methodOverride = require('method-override'); // requiero methodOverride para poder usar los metodos PUT y DELETE
const PORT = 3000;



// enrutadores
const indexRouter = require('./routes/indexRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const adminRouter = require('./routes/adminRouter')

/* Middlewares de aplicación */
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));


// archivos estaticos de uso publico
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(methodOverride('_method'));  // override with POST having ?_method=DELETE

/* Temple engine config */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// middlewares routes 
app.use('/', indexRouter); // gestiona Home
app.use('/products', productsRouter); // gestiona listado, detalle
app.use('/users', usersRouter); // gestiona login, perfil, registro
app.use('/admin', adminRouter); // gestiona CRUD de productos 

/*


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

app.get('/admin/productos', (req, res) => {
    let listProducts = path.join(__dirname, '/views/admin/products/listProducts.ejs');
    res.render(listProducts);
})
*/


app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));