const {products} = require('../data')

const indexController = {
    index: (req, res) => {
        let guitars = products.filter(guitar => guitar.category === 'guitar')
        let accesories = products.filter(accesory => accesory.category === 'accesory');

        res.render('home/index', {
            guitars,
            accesories,
            user: req.session.userLogged
        })
            
        
    },
}

module.exports = indexController;