const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    // distination permite definir la carpeta donde se va almacenar el archivo
    destination: (req, file, cb) => {
        
        cb(null, path.join(__dirname, '../../public/images/products'));
    },

    //filename permite indicar con que nombre se guardara ese archivo en el servidor
    filename: (req, file, cb) => {
        // agrego Date.now para que los nombres de las imagenes nunca se repitan
        const newImageProduct = 'imageProduct' + Date.now() + path.extname(file.originalname);
        cb(null, newImageProduct);
    },
});

const upload = multer({
    storage: storage,
    limits: { fieldSize: 20000 },

});

module.exports = upload;