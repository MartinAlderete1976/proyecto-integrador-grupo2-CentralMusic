
const adminController = {
    index: (req, res) => {
        res.render('admin/adminIndex', {
            title: 'inicio admin'
        })
    }
}





module.exports = adminController;