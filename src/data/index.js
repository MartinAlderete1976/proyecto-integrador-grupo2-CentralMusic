const fs = require('fs');
const path = require('path');

module.exports = {
    guitars: JSON.parse(fs.readFileSync(path.join(__dirname, '/guitars.json'), 'utf-8')),
    writeGuitars: (data) => {
        fs.writeFileSync(path.join(__dirname, '/guitars.json'), JSON.stringify(data));
    },
    accesories: JSON.parse(fs.readFileSync(path.join(__dirname, '/accesories.json'), 'utf-8')),
    writeAccesories: (data) => {
        fs.writeFileSync(path.join(__dirname, '/accesories.json'), JSON.stringify(data));
    },
    usuarios: JSON.parse(fs.readFileSync(path.join(__dirname, '/users.json'), 'utf-8')),
    writeUsers: (data) => {
        fs.writeFileSync(path.join(__dirname, '/users.json'), JSON.stringify(data));
    },
}