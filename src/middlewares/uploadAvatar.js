const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/avatars'));
    },
    filename: (req, file, cb) => {
        const avatar = 'avatar'  + Date.now() + path.extname(file.originalname);
        cb(null, avatar);
    },

});

const upload = multer({
    storage: storage,
    limits: { fieldSize: 20000 },

});

module.exports = upload;