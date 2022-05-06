const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override'); // requiero methodOverride para poder usar los metodos PUT y DELETE
const PORT = 3000;



// enrutadores
const indexRouter = require('./routes/indexRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const adminRouter = require('./routes/adminRouter');

//Middlewares globales
// archivos estaticos de uso publico
app.use(express.static(path.join(__dirname, '../public')));
//esto me permite procesar los formularios y poder usar req.body
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




app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));