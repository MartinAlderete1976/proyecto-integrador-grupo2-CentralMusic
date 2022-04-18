const {guitars, accesories} = require('../data')

const indexController = {
    index: (req, res) => {
        res.render('home/index', {
            guitars,
            accesories,
        });
    }
}

module.exports = indexController;