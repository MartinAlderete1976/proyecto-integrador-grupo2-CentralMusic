const {guitars, accesories, writeGuitars, writeAccesories} = require('../../data');
const products = [...guitars, ...accesories];

const adminProductsController = {
    
    //muestra listado de productos
    list: (req, res) => {
        let products = [...guitars, ...accesories];

        res.render('admin/products/listProducts', {
            products,
        })
    },
    // muestra detalle del producto en admin
    detail: (req, res) => {
        let products = [...guitars, ...accesories];
        let productId = +req.params.id;
        let product = products.find(product => product.id == productId);

        
        res.render('admin/products/adminDetail', {
            product,
            products,
        })
    },
    // envia la vista de formulario de creacion de producto
    add: (req, res) => {
        res.render('admin/products/addProduct');
    },
    // Recibe los datos del form de creacion y guarda el producto en la DB
    create: (req, res) => {
        // 1 - Crear el objeto producto
        let lastId = 0;
        products.forEach(product => {
            if(product.id > lastId){
                lastId = product.id
            }
        });

        let newProduct = {
            ...req.body,
            id: lastId + 1,
            image: ' ',
            stock: req.body.stock ? true : false
        };

        // Guardo el nuevo prodcuto en su respectivo array y sobresscribo el JSON
        if(newProduct.category === 'guitar'){
            guitars.push(newProduct);
            writeGuitars(guitars);
        }else{
            accesories.push(newProduct);
            writeAccesories(accesories);
        };

        res.redirect('/admin/products');
    },
    // envia la vista de form de edicion de producto
    edit: (req, res) => {
        // 1- Obtener el id del producto
        let idProduct = +req.params.id;
        // 2- Buscar el producto a editar
        let product = products.find(product => product.id === idProduct);
        // 3- Mostrar el producto en la vista
        res.render('admin/products/editProduct', {
            title: 'Edicion',
            product,
        })
    },
    //Recibe los datos actualizados del form de edicion
    update: (req, res) => {
        //1- Obtener el id del prodcuto
        let idProduct = +req.params.id;
        
        //2- Buscar el producto a editar y mofidicar el producto
        
        let editProduct = products.forEach(product => {
            if(product.id === idProduct){
                product.name = req.body.name;
                product.marca = req.body.marca;
                product.line = req.body.line;
                product.model = req.body.model;
                product.hand = req.body.hand;
                product.price = req.body.price;
                product.color = req.body.color;
                product.materialBody = req.body.materialBody;
                product.materialFreatboard = req.body.materialFreatboard;
                product.bodyFinish = req.body.bodyFinish;
                product.category = req.body.category;
                product.stock = req.body.stock ? true : false;
                product.description = req.body.description
            }
        });
        //3- Guardar los cambios
        if(editProduct.category === 'guitar'){
            writeGuitars(guitars)
        }else{
            writeAccesories(accesories)
        }
        //- Respuesta
        res.redirect('/admin/products');  

    },
}



module.exports = adminProductsController;