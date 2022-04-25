const {guitars, accesories, writeGuitars, writeAccesories} = require('../../data');


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

    add: (req, res) => {
        res.render('admin/products/addProduct');
    }
}



module.exports = adminProductsController;