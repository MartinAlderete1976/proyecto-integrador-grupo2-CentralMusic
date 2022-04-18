const {guitars, accesories} = require('../data')


const productsController = {
    // muestra todas las guitarras
    guitars: (req, res) => res.send('todas las guitarras'),
    // muesta todos los accesorios
    accesories: (req, res) => res.send('todos los accesorios'),
    // muestra detalle de cada producto
    detail: (req, res) => {
        let products = [ ...guitars, ...accesories];
        let productId = +req.params.id;
        let product = products.find(product => product.id === productId);

        res.render('products/detailsProduct', {
            product,
            products,
        })
    }


}   
module.exports = productsController;