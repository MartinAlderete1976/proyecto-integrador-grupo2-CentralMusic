const { products, writeProducts } = require('../../data');
const db = require('../../database/models');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');




const adminProductsController = {

    //muestra listado de productos
    list: (req, res) => {
        db.Product.findAll({
            include: [
                { association: 'marca' },
                { association: 'subcategories' }
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
                { association: 'subcategories' },
                { association: 'guitarDetail' },
                { association: 'cuerdaDetail' },
                { association: 'pedalDetail' },
                { association: 'cableDetail' },
                { association: 'marca' },
                { association: 'productsImages' }
            ]
        })
            .then(product => {
                res.render('admin/products/adminDetail', {
                    product,
                })
            })

        // let product = products.find(product => product.id == productId);

    },
    // envia la vista de formulario de creacion de producto
    addGuitar: (req, res) => {

        db.Marca.findAll()
            .then(marcas => {
                res.render('admin/products/addGuitar', {
                    marcas,

                });

            })

    },
    // Recibe los datos del form de creacion y guarda el producto en la DB

    createGuitar: (req, res) => {

        let errors = validationResult(req)


        if (errors.isEmpty()) {

            db.Product.create({

                price: req.body.price,
                name: req.body.nameProduct,
                description: req.body.description,
                stock: req.body.stock ? true : false,
                subcategories_id: 1,
                marcas_id: req.body.marca,
            })
                .then(product => {
                    db.GuitarDetail.create({

                        model: req.body.model,
                        line: req.body.line,
                        body_finish: req.body.bodyFinish,
                        material_body: req.body.materialBody,
                        hand: req.body.hand,
                        color: req.body.color,
                        material_fretboard: req.body.materialFretboard,
                        products_id: product.id,
                    })
                        .then(guitarDetail => {
                            let arrayImages = req.files.map(image => {
                                return {
                                    name_image: image.filename,
                                    products_id: guitarDetail.products_id,
                                }
                            })
                            db.ProductImage.bulkCreate(arrayImages)
                                .then(() => res.redirect('/admin/products'))
                                .catch(error => console.log(error))
                        })


                })
                .catch(error => console.log(error));


        } else {

            db.Marca.findAll()
                .then(marcas => {
                    res.render('admin/products/addGuitar', {
                        marcas,
                        errors: errors.mapped(),
                        old: req.body,

                    });

                })

        }



    },


    // envia la vista de form de edicion de producto
    editGuitar: (req, res) => {

        // 1- Obtener el id del producto
        let idProduct = +req.params.id;
        // 2- Buscar el producto a editar
        let listaMarcas;

        db.Marca.findAll()
            .then(marcas => {
                listaMarcas = marcas

            })
        db.Product.findByPk(idProduct, {
            include: [
                { association: 'marca' },
                { association: 'guitarDetail' },
                { association: 'productsImages' },
            ]
        })
            .then(product => {
                //res.send(product)
                res.render('admin/products/editGuitar', {
                    listaMarcas,
                    product
                })
            })
            .catch(error => console.log(error))

    },
    //Recibe los datos actualizados del form de edicion
    updateGuitar: (req, res) => {

        let errors = validationResult(req)


        if (errors.isEmpty()) {


            db.Product.update({
                price: req.body.price,
                name: req.body.nameProduct,
                marca: req.body.marca,
                description: req.body.description,
                stock: req.body.stock ? true : false,
                marcas_id: req.body.marca,
            }, {
                where: {
                    id: req.params.id,
                }
            })
                .then(() => {
                    
                    db.GuitarDetail.update({
                        model: req.body.model,
                        line: req.body.line,
                        body_finish: req.body.bodyFinish,
                        material_body: req.body.materialBody,
                        hand: req.body.hand,
                        color: req.body.color,
                        material_fretboard: req.body.materialFretboard,

                    }, {
                        where: {
                            products_id: req.params.id,
                        }
                    })
                        .then(() => {

                            if (req.files !== undefined) {

                                if (req.files.length > 0) {

                                    db.ProductImage.findAll({
                                        where: {
                                            products_id: req.params.id
                                        }
                                    })
                                        .then(images => {
                                            let imagesName = images.map(image => image.name_image);

                                            imagesName.forEach(image => {
                                                if (fs.existsSync(path.join(__dirname, `../../../public/images/products/${image}`))) {
                                                    fs.unlinkSync(path.join(__dirname, `../../../public/images/products/${image}`))
                                                } else {
                                                    console.log('-- no se encontro el archivo')
                                                }
                                            })
                                            db.ProductImage.destroy({
                                                where: {
                                                    products_id: req.params.id,
                                                }
                                            })
                                                .then(() => {
                                                    let arrayImages = req.files.map(image => {
                                                        return {
                                                            name_image: image.filename,
                                                            products_id: req.params.id
                                                        }
                                                    })
                                                    db.ProductImage.bulkCreate(arrayImages)
                                                        .then(() => res.redirect('/admin/products'))
                                                })
                                                .catch(error => console.log(error))
                                        })
                                        .catch(error => console.log(error))
                                } else {
                                    res.redirect('/admin/products')

                                }
                            }
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        } else {
            let idProduct = +req.params.id;
            // 2- Buscar el producto a editar
            let listaMarcas;

            db.Marca.findAll()
                .then(marcas => {
                    listaMarcas = marcas

                })
            db.Product.findByPk(idProduct, {
                include: [
                    { association: 'marca' },
                    { association: 'guitarDetail' },
                    { association: 'productsImages' },
                ]
            })
                .then(product => {
                    //res.send(product)
                    res.render('admin/products/editGuitar', {
                        listaMarcas,
                        product,
                        errors: errors.mapped(),
                        old: req.body,
                    })
                })
                .catch(error => console.log(error))
        }


    },
    // envia la vista de formulario de creacion de un accesorio
    addAccesory: (req, res) => {

        db.Marca.findAll()
            .then(marcas => {
                res.render('admin/products/addAccesory', {
                    marcas,
                })
            })


    },

    createAccesory: (req, res) => {

        const errors = validationResult(req)

        if (errors.isEmpty()) {
            db.Product.create({

                price: req.body.price,
                name: req.body.nameProduct,
                description: req.body.description,
                stock: req.body.stock ? true : false,
                subcategories_id: 3,
                marcas_id: req.body.marca,
            })
                .then(product => {

                    db.CuerdaDetail.create({

                        cantidad_cuerdas: req.body.strings,
                        tension: req.body.tension,
                        materiales: req.body.material,
                        calibre: req.body.calibre,
                        products_id: product.id,
                    })
                        .then(cuerdaDetail => {
                            let arrayImages = req.files.map(image => {
                                return {
                                    name_image: image.filename,
                                    products_id: cuerdaDetail.products_id,
                                }
                            })
                            db.ProductImage.bulkCreate(arrayImages)
                                .then(() => res.redirect('/admin/products'))
                                .catch(error => console.log(error))
                        })


                })
                .catch(error => console.log(error));

        } else {

            db.Marca.findAll()
                .then(marcas => {
                    res.render('admin/products/addAccesory', {
                        marcas,
                        errors: errors.mapped(),
                        old: req.body
                    });
                })

        }

    },


    editAccesory: (req, res) => {

        // 1- Obtener el id del producto
        let idProduct = +req.params.id;
        // 2- Buscar el producto a editar
        let listaMarcas;

        db.Marca.findAll()
            .then(marcas => {
                listaMarcas = marcas

            })
        db.Product.findByPk(idProduct, {
            include: [
                { association: 'marca' },
                { association: 'cuerdaDetail' },
                { association: 'productsImages' },
            ]
        })
            .then(product => {
                //res.send(product)
                res.render('admin/products/editAccesory', {
                    listaMarcas,
                    product
                })
            })
            .catch(error => console.log(error))

    },

    //Recibe los datos actualizados del form de edicion
    updateAccesory: (req, res) => {

        let errors = validationResult(req)


        if (errors.isEmpty()) {


            db.Product.update({
                price: req.body.price,
                name: req.body.nameProduct,
                marca: req.body.marca,
                description: req.body.description,
                stock: req.body.stock ? true : false,
                marcas_id: req.body.marca,
            }, {
                where: {
                    id: req.params.id,
                }
            })
                .then(() => {
                    

                    db.CuerdaDetail.update({
                        cantidad_cuerdas: req.body.strings,
                        tension: req.body.tension,
                        materiales: req.body.material,
                        calibre: req.body.calibre,

                    }, {
                        where: {
                            products_id: req.params.id,
                        }
                    })
                        .then(() => {

                            if (req.files !== undefined) {

                                if (req.files.length > 0) {

                                    db.ProductImage.findAll({
                                        where: {
                                            products_id: req.params.id
                                        }
                                    })
                                    .then(images => {
                                        let imagesName = images.map(image => image.name_image);

                                        imagesName.forEach(image => {
                                            if (fs.existsSync(path.join(__dirname, `../../../public/images/products/${image}`))) {
                                                fs.unlinkSync(path.join(__dirname, `../../../public/images/products/${image}`))
                                            } else {
                                                console.log('-- no se encontro el archivo')
                                            }
                                        })
                                        db.ProductImage.destroy({
                                            where: {
                                                products_id: req.params.id,
                                            }
                                        })
                                        .then(() => {
                                             let arrayImages = req.files.map(image => {
                                                    return {
                                                        name_image: image.filename,
                                                        products_id: req.params.id
                                                    }
                                            })
                                                db.ProductImage.bulkCreate(arrayImages)
                                                    .then(() => res.redirect('/admin/products'))
                                        })
                                        .catch(error => console.log(error))
                                        })
                                        .catch(error => console.log(error))
                                } else {
                                    res.redirect('/admin/products')

                                }
                            }
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        } else {
            let idProduct = +req.params.id;
            // 2- Buscar el producto a editar
            let listaMarcas;

            db.Marca.findAll()
                .then(marcas => {
                    listaMarcas = marcas

                })
            db.Product.findByPk(idProduct, {
                include: [
                    { association: 'marca' },
                    { association: 'cuerdaDetail' },
                    { association: 'productsImages' },
                ]
            })
                .then(product => {
                    //res.send(product)
                    res.render('admin/products/editAccesory', {
                        listaMarcas,
                        product,
                        errors: errors.mapped(),
                        old: req.body,
                    })
                })
                .catch(error => console.log(error))
        }

    },

    addPedal: (req, res) => {
        db.Marca.findAll()
            .then(marcas => {
                res.render('admin/products/addPedal', {
                    marcas,
                })
            })
    },

    createPedal: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.Product.create({

                price: req.body.price,
                name: req.body.nameProduct,
                description: req.body.description,
                stock: req.body.stock ? true : false,
                subcategories_id: 2,
                marcas_id: req.body.marca,
            })
                .then(product => {

                    db.PedalDetail.create({

                        vocal: req.body.vocal,
                        cantidad_efectos: req.body.efects,
                        instrumentos_compatibles: req.body.instruments,
                        tipo_de_efectos: req.body.typeEfect,
                        voltaje: req.body.voltaje,
                        tecnologia: req.body.technology,
                        alimentacion: req.body.feeding,
                        products_id: product.id,
                    })
                        .then(pedalDetail => {
                            let arrayImages = req.files.map(image => {
                                return {
                                    name_image: image.filename,
                                    products_id: pedalDetail.products_id,
                                }
                            })
                            db.ProductImage.bulkCreate(arrayImages)
                                .then(() => res.redirect('/admin/products'))
                                .catch(error => console.log(error))
                        })


                })
                .catch(error => console.log(error));




        } else {
            db.Marca.findAll()
                .then(marcas => {
                    res.render('admin/products/addPedal', {
                        marcas,
                        errors: errors.mapped(),
                        old: req.body,
                    })
                })

        }

    },

    editPedal: (req, res) => {
         // 1- Obtener el id del producto
         let idProduct = +req.params.id;
         // 2- Buscar el producto a editar
         let listaMarcas;
 
         db.Marca.findAll()
             .then(marcas => {
                 listaMarcas = marcas
 
             })
         db.Product.findByPk(idProduct, {
             include: [
                 { association: 'marca' },
                 { association: 'pedalDetail' },
                 { association: 'productsImages' },
             ]
         })
             .then(product => {
                 //res.send(product)
                 res.render('admin/products/editPedal', {
                     listaMarcas,
                     product
                 })
             })
             .catch(error => console.log(error))



    },

    updatePedal: (req, res) => {
        let errors = validationResult(req)


        if (errors.isEmpty()) {


            db.Product.update({
                price: req.body.price,
                name: req.body.nameProduct,
                marca: req.body.marca,
                description: req.body.description,
                stock: req.body.stock ? true : false,
                marcas_id: req.body.marca,
            }, {
                where: {
                    id: req.params.id,
                }
            })
                .then(() => {
                    

                    db.PedalDetail.update({
                        vocal: req.body.vocal,
                        cantidad_efectos: req.body.efects,
                        instrumentos_compatibles: req.body.instruments,
                        tipo_de_efectos: req.body.typeEfect,
                        voltaje: req.body.voltaje,
                        tecnologia: req.body.technology,
                        alimentacion: req.body.feeding,

                    }, {
                        where: {
                            products_id: req.params.id,
                        }
                    })
                        .then(() => {

                            if (req.files !== undefined) {

                                if (req.files.length > 0) {

                                    db.ProductImage.findAll({
                                        where: {
                                            products_id: req.params.id
                                        }
                                    })
                                        .then(images => {
                                            let imagesName = images.map(image => image.name_image);

                                            imagesName.forEach(image => {
                                                if (fs.existsSync(path.join(__dirname, `../../../public/images/products/${image}`))) {
                                                    fs.unlinkSync(path.join(__dirname, `../../../public/images/products/${image}`))
                                                } else {
                                                    console.log('-- no se encontro el archivo')
                                                }
                                            })
                                            db.ProductImage.destroy({
                                                where: {
                                                    products_id: req.params.id,
                                                }
                                            })
                                                .then(() => {
                                                    let arrayImages = req.files.map(image => {
                                                        return {
                                                            name_image: image.filename,
                                                            products_id: req.params.id
                                                        }
                                                    })
                                                    db.ProductImage.bulkCreate(arrayImages)
                                                        .then(() => res.redirect('/admin/products'))
                                                })
                                                .catch(error => console.log(error))
                                        })
                                        .catch(error => console.log(error))
                                } else {
                                    res.redirect('/admin/products')

                                }
                            }
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        } else {
            let idProduct = +req.params.id;
            // 2- Buscar el producto a editar
            let listaMarcas;

            db.Marca.findAll()
                .then(marcas => {
                    listaMarcas = marcas

                })
            db.Product.findByPk(idProduct, {
                include: [
                    { association: 'marca' },
                    { association: 'pedalDetail' },
                    { association: 'productsImages' },
                ]
            })
                .then(product => {
                    //res.send(product)
                    res.render('admin/products/editPedal', {
                        listaMarcas,
                        product,
                        errors: errors.mapped(),
                        old: req.body,
                    })
                })
                .catch(error => console.log(error))
        }

    },

    addCable: (req, res) => {
        db.Marca.findAll()
            .then(marcas => {
                res.render('admin/products/addCable', {
                    marcas,
                })
            })
    },

    createCable: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.Product.create({

                price: req.body.price,
                name: req.body.nameProduct,
                description: req.body.description,
                stock: req.body.stock ? true : false,
                subcategories_id: 4,
                marcas_id: req.body.marca,
            })
                .then(product => {

                    db.CableDetail.create({

                        conector_entrada: req.body.inputIn,
                        conector_salida: req.body.inputOut,
                        largo: req.body.large,
                        tipo_de_efectos: req.body.typeEfect,
                        products_id: product.id,
                    })
                        .then(cableDetail => {
                            let arrayImages = req.files.map(image => {
                                return {
                                    name_image: image.filename,
                                    products_id: cableDetail.products_id,
                                }
                            })
                            db.ProductImage.bulkCreate(arrayImages)
                                .then(() => res.redirect('/admin/products'))
                                .catch(error => console.log(error))
                        })


                })
                .catch(error => console.log(error));

            

        } else {
            db.Marca.findAll()
                .then(marcas => {
                    res.render('admin/products/addCable', {
                        marcas,
                        errors: errors.mapped(),
                        old: req.body,
                    })
                })

        }

    },

    editCable: (req, res) => {
         // 1- Obtener el id del producto
         let idProduct = +req.params.id;
         // 2- Buscar el producto a editar
         let listaMarcas;
 
         db.Marca.findAll()
             .then(marcas => {
                 listaMarcas = marcas
 
             })
         db.Product.findByPk(idProduct, {
             include: [
                 { association: 'marca' },
                 { association: 'cableDetail' },
                 { association: 'productsImages' },
             ]
         })
             .then(product => {
                 //res.send(product)
                 res.render('admin/products/editCable', {
                     listaMarcas,
                     product
                 })
             })
             .catch(error => console.log(error))



    },

    updateCable: (req, res) => {
        let errors = validationResult(req)


        if (errors.isEmpty()) {
            

            db.Product.update({
                price: req.body.price,
                name: req.body.nameProduct,
                marca: req.body.marca,
                description: req.body.description,
                stock: req.body.stock ? true : false,
                marcas_id: req.body.marca,
            }, {
                where: {
                    id: req.params.id,
                }
            })
                .then(() => {
                    

                    db.CableDetail.update({
                        conector_entrada: req.body.inputIn,
                        conector_salida: req.body.inputOut,
                        largo: req.body.large,
                        tipo_de_efectos: req.body.typeEfect,

                    }, {
                        where: {
                            products_id: req.params.id,
                        }
                    })
                        .then(() => {

                            if (req.files !== undefined) {

                                if (req.files.length > 0) {

                                    db.ProductImage.findAll({
                                        where: {
                                            products_id: req.params.id
                                        }
                                    })
                                        .then(images => {
                                            let imagesName = images.map(image => image.name_image);

                                            imagesName.forEach(image => {
                                                if (fs.existsSync(path.join(__dirname, `../../../public/images/products/${image}`))) {
                                                    fs.unlinkSync(path.join(__dirname, `../../../public/images/products/${image}`))
                                                } else {
                                                    console.log('-- no se encontro el archivo')
                                                }
                                            })
                                            db.ProductImage.destroy({
                                                where: {
                                                    products_id: req.params.id,
                                                }
                                            })
                                                .then(() => {
                                                    let arrayImages = req.files.map(image => {
                                                        return {
                                                            name_image: image.filename,
                                                            products_id: req.params.id
                                                        }
                                                    })
                                                    db.ProductImage.bulkCreate(arrayImages)
                                                        .then(() => res.redirect('/admin/products'))
                                                })
                                                .catch(error => console.log(error))
                                        })
                                        .catch(error => console.log(error))
                                } else {
                                    res.redirect('/admin/products')

                                }
                            }
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        } else {
            let idProduct = +req.params.id;
            // 2- Buscar el producto a editar
            let listaMarcas;

            db.Marca.findAll()
                .then(marcas => {
                    listaMarcas = marcas

                })
            db.Product.findByPk(idProduct, {
                include: [
                    { association: 'marca' },
                    { association: 'cableDetail' },
                    { association: 'productsImages' },
                ]
            })
                .then(product => {
                    //res.send(product)
                    res.render('admin/products/editCable', {
                        listaMarcas,
                        product,
                        errors: errors.mapped(),
                        old: req.body,
                    })
                })
                .catch(error => console.log(error))
        }



    },
 
    delete: (req, res) => {

        let idProduct = +req.params.id;
        
       

        db.Product.findByPk(idProduct, {
            include: [
                { association: 'subcategories' },
                { association: 'guitarDetail' },
                { association: 'cuerdaDetail' },
                { association: 'pedalDetail' },
                { association: 'cableDetail' },
                { association: 'marca' },
                { association: 'productsImages' }
            ]
        })
        .then(product => {
           
            if(product.dataValues.subcategories_id === 1){
                db.GuitarDetail.destroy({
                    where: {
                        products_id: idProduct
                    }
                })
                .then(() => {
                    db.ProductImage.findAll({
                        where: {
                            products_id: idProduct
                        }
                    })
                    .then(images => {
                        let imageNames = images.map(image => image.name_image);

                        imageNames.forEach(image => {
                            if(fs.existsSync(path.join(__dirname, `../../../public/images/products/${image}`))){
                              fs.unlinkSync(path.join(__dirname, `../../../public/images/products/${image}`))
                            }else{
                              console.log("-- No se encontró el archivo");
                            }
                          });
                          db.ProductImage.destroy({
                              where: {
                                  products_id: idProduct
                              }
                          })
                          .then(() => {
                              db.Product.destroy({
                                  where: {
                                      id: idProduct
                                  }
                              })
                          })
                          .then(() => res.redirect('/admin/products'))
                          .catch((error) => console.log(error))

                    })
                    .catch((error) => console.log(error))

                })
                .catch((error) => console.log(error))
                
            } else if(product.dataValues.subcategories_id === 2){
                db.PedalDetail.destroy({
                    where: {
                        products_id: idProduct
                    }
                })
                .then(() => {
                    db.ProductImage.findAll({
                        where: {
                            products_id: idProduct
                        }
                    })
                    .then(images => {
                        let imageNames = images.map(image => image.name_image);

                        imageNames.forEach(image => {
                            if(fs.existsSync(path.join(__dirname, `../../../public/images/products/${image}`))){
                              fs.unlinkSync(path.join(__dirname, `../../../public/images/products/${image}`))
                            }else{
                              console.log("-- No se encontró el archivo");
                            }
                          });
                          db.ProductImage.destroy({
                              where: {
                                  products_id: idProduct
                              }
                          })
                          .then(() => {
                              db.Product.destroy({
                                  where: {
                                      id: idProduct
                                  }
                              })
                          })
                          .then(() => res.redirect('/admin/products'))
                          .catch((error) => console.log(error))

                    })
                    .catch((error) => console.log(error))

                })
                .catch((error) => console.log(error))

            } else if(product.dataValues.subcategories_id === 3){
                db.CuerdaDetail.destroy({
                    where: {
                        products_id: idProduct
                    }
                })
                .then(() => {
                    db.ProductImage.findAll({
                        where: {
                            products_id: idProduct
                        }
                    })
                    .then(images => {
                        let imageNames = images.map(image => image.name_image);

                        imageNames.forEach(image => {
                            if(fs.existsSync(path.join(__dirname, `../../../public/images/products/${image}`))){
                              fs.unlinkSync(path.join(__dirname, `../../../public/images/products/${image}`))
                            }else{
                              console.log("-- No se encontró el archivo");
                            }
                          });
                          db.ProductImage.destroy({
                              where: {
                                  products_id: idProduct
                              }
                          })
                          .then(() => {
                              db.Product.destroy({
                                  where: {
                                      id: idProduct
                                  }
                              })
                          })
                          .then(() => res.redirect('/admin/products'))
                          .catch((error) => console.log(error))

                    })
                    .catch((error) => console.log(error))

                })
                .catch((error) => console.log(error))
            } else if(product.dataValues.subcategories_id === 4){
                db.CableDetail.destroy({
                    where: {
                        products_id: idProduct
                    }
                })
                .then(() => {
                    db.ProductImage.findAll({
                        where: {
                            products_id: idProduct
                        }
                    })
                    .then(images => {
                        let imageNames = images.map(image => image.name_image);

                        imageNames.forEach(image => {
                            if(fs.existsSync(path.join(__dirname, `../../../public/images/products/${image}`))){
                              fs.unlinkSync(path.join(__dirname, `../../../public/images/products/${image}`))
                            }else{
                              console.log("-- No se encontró el archivo");
                            }
                          });
                          db.ProductImage.destroy({
                              where: {
                                  products_id: idProduct
                              }
                          })
                          .then(() => {
                              db.Product.destroy({
                                  where: {
                                      id: idProduct
                                  }
                              })
                          })
                          .then(() => res.redirect('/admin/products'))
                          .catch((error) => console.log(error))

                    })
                    .catch((error) => console.log(error))

                })
                .catch((error) => console.log(error))

            }

        })
        

        
    },
}



module.exports = adminProductsController;