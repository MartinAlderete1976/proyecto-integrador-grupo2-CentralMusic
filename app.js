const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;



app.use(express.static(path.join(__dirname, 'public')));

// routes 

app.get('/', (req, res) => {
    let home = path.join(__dirname, '/views/index.html');
    res.sendFile(home);
});







app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));