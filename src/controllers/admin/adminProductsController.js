const {products, writeProducts} = require('../../data');
const db = require('../../database/models');
const { validationResult } = require('express-validator');




const adminProductsController = {
    
    //muestra listado de productos
    list: (req, res) => {
        db.Product.findAll({
            include: [
                {association: 'marca'},
                {association: 'subcategories'}
            ]
        })
            .then(products => {

    
                res.render('admin/products/listProducts', {
                    products, 
                })
            })
        
    },
    // muestra detalle del producto en admin
    detail: (req, res) => {
        let productId = +req.params.id;
        
        db.Product.findByPk(productId, {
            include: [
                {association: 'subcategories'},
                {association: 'guitarDetail'},
                {association: 'cuerdaDetail'},
                {association: 'pedalDetail'},
                {association: 'cableDetail'},
                {association: 'marca'},
                {association: 'productsImages'}
            ]
        })
            .then(product => {
                res.render('admin/products/adminDetail', {
                    product,
                    //products,
                })
            })
        
        
        
       // let product = products.find(product => product.id == productId);

        
        
    },
    // envia la vista de formulario de creacion de producto
    addProduct: (req, res) => {
       let listaMarca
       let listaSubcategory

        db.Marca.findAll()
            .then(marcas => {
                listaMarca = marcas
                db.Subcategory.findAll()
                    .then(subcategories => {
                        listaSubcategory =subcategories
                        res.render('admin/products/addProduct', {
                            listaMarca,
                            listaSubcategory,
                        
                        });
                  
                    })
                
            })
        
            
       
        
    },
    // Recibe los datos del form de creacion y guarda el producto en la DB
    productCreate: (req, res) => {

        let errors = validationResult(req)

        if(errors.isEmpty()){






        }else{
            res.render('admin/products/addProduct', {
                errors: errors.mapped(),
                old: req.body
            })

        }

        // 1 - Crear el objeto producto
        let lastId = 0;
        products.forEach(product => {
            if(product.id > lastId){
                lastId = product.id
            }
        });
        
        let file = req.file;
    
        if(!file){
            //res.status(400).send('No agregaste una imagen o la imagen que agregaste es superior a 2MB, volve para atras')
            res.redirect('/admin/products/guitar/add');
           
        } else {

            let newProduct = {
                ...req.body,
                id: lastId + 1,
                image: file.filename,
                stock: req.body.stock ? true : false
            };

            
            // Guardo nueva guitarra en su respectivo array y sobresscribo el JSON
            products.push(newProduct);

            // Paso 3 - Escribir el JSON de productos con el array actual

            writeProducts(products)

        
            res.redirect('/admin/products');


        }    
        
        
       

       
    },
    // envia la vista de form de edicion de producto
    editGuitar: (req, res) => {

        // 1- Obtener el id del producto
        let idProduct = +req.params.id;
        // 2- Buscar el producto a editar
        let product = products.find(product => product.id === idProduct);
        // 3- Mostrar el producto en la vista
        res.render('admin/products/editGuitar', {
            title: 'Edicion',
            product,
        })
    },
    //Recibe los datos actualizados del form de edicion
    updateGuitar: (req, res) => {

    
        //1- Obtener el id del prodcuto
        let idProduct = +req.params.id;

        // guardo en variable la imagen que subo
        let file = req.file



        // pregunto si el archvio existe (si se subio)
        if(!file) {
            //2- Buscar el producto a editar y mofidicar el producto
        
            products.forEach(product => {
                if(product.id === idProduct){
                    product.name = req.body.name;
                    product.marca = req.body.marca;
                    product.line = req.body.line;
                    product.model = req.body.model;
                    product.hand = req.body.hand;
                    product.price = req.body.price;
                    product.color = req.body.color;
                    product.materialBody = req.body.materialBody;
                    product.materialFretboard = req.body.materialFretboard;
                    product.bodyFinish = req.body.bodyFinish;
                    product.category = req.body.category;
                    product.stock = req.body.stock ? true : false;
                    product.description = req.body.description
                }
            }); 

            
            //3- Guardar los cambios
            writeProducts(products)
            //- Respuesta
            res.redirect('/admin/products')
        
        } else {

            products.forEach(product => {
                if(product.id === idProduct){
                    product.name = req.body.name;
                    product.marca = req.body.marca;
                    product.line = req.body.line;
                    product.model = req.body.model;
                    product.hand = req.body.hand;
                    product.price = req.body.price;
                    product.color = req.body.color;
                    product.materialBody = req.body.materialBody;
                    product.materialFretboard = req.body.materialFretboard;
                    product.bodyFinish = req.body.bodyFinish;
                    product.image = req.file.filename;
                    product.category = req.body.category;
                    product.stock = req.body.stock ? true : false;
                    product.description = req.body.description
                }
            });
            
            //3- Guardar los cambios
            writeProducts(products)
            //- Respuesta
            res.redirect('/admin/products')
        

        }
        

            
        
        
       
       
        
        
       

    },
    // envia la vista de formulario de creacion de un accesorio
    addAccesory: (req, res) => {
        res.render('admin/products/addAccesory');
    },

    createAccesory: (req, res) => {

        // 1 - Crear el objeto producto
        let lastId = 0;
        products.forEach(product => {
            if(product.id > lastId){
                lastId = product.id
            }
        });
        
       
        let file = req.file;
        
        if(!file){
            //res.status(400).send('No agregaste una imagen o la imagen que agregaste es superior a 2MB, volve para atras')
            res.redirect('/admin/products/accesory/add');
           
        }  else {

            let newProduct = {
                ...req.body,
                id: lastId + 1,
                image: file.filename,
                stock: req.body.stock ? true : false
            };

            
            // Guardo nueva guitarra en su respectivo array y sobresscribo el JSON
            products.push(newProduct);

            // Paso 3 - Escribir el JSON de productos con el array actual

            writeProducts(products)

        
            res.redirect('/admin/products');


        }    

        
    
    },


    editAccesory: (req, res) => {

        let idProduct = +req.params.id;
        // 2- Buscar el producto a editar
        let product = products.find(product => product.id === idProduct);
        // 3- Mostrar el producto en la vista
        res.render('admin/products/editAccesory', {
            title: 'Edicion',
            product,
        })

       
    },

    //Recibe los datos actualizados del form de edicion
    updateAccesory: (req, res) => {
        
        let idProduct = +req.params.id;

        let file = req.file;

        if(!file){

            products.forEach(product => {
                if(product.id === idProduct){
                    product.name = req.body.name;
                    product.marca = req.body.marca;
                    product.model = req.body.model;
                    product.price = req.body.price;
                    product.category = req.body.category;
                    product.stock = req.body.stock ? true : false;
                    product.description = req.body.description;
                }
            });
    
            //3- Guardar los cambios
            writeProducts(products)
            //- Respuesta
            res.redirect('/admin/products')

        } else {

            products.forEach(product => {
                if(product.id === idProduct){
                    product.name = req.body.name;
                    product.marca = req.body.marca;
                    product.model = req.body.model;
                    product.price = req.body.price;
                    product.category = req.body.category;
                    product.stock = req.body.stock ? true : false;
                    product.image = req.file.filename;
                    product.description = req.body.description;
                }
            });
    
            //3- Guardar los cambios
            writeProducts(products)
            //- Respuesta
            res.redirect('/admin/products')



        }
        
       
    },

    delete: (req, res) => {
        // 1- Obtener el id del producto a eliminar
        let idProduct = +req.params.id;
        // 2- Buscar el producto dentro del array y elminarlo
        products.forEach(product => {
            if(product.id === idProduct){
                //obtener la ubicacion(indice) del producto a eliminar
                let productToDeleteIndex = products.indexOf(product);
                //Elimino el producto del array
                products.splice(productToDeleteIndex, 1);
            }
        });
        /* 3 - Sobreescribir el json */
        writeProducts(products);
        /* 4 - Enviar respuesta  */
        res.redirect('/admin/products')
    },
}



module.exports = adminProductsController;