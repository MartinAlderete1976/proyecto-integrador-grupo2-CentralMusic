const { production } = require("../config/config");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        price: {
            type: dataTypes.INTEGER(11),
            allowNull: false,

        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false,
        },
        stock: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
        },
        subcategories_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        marcas_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        }
    }
    let config = {
        tableName: 'products',
        timestamps: false,
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
        Product.hasOne(models.GuitarDetail, {
            as: 'guitarDetail',
            foreignKey: 'products_id'
        })
        Product.hasOne(models.CableDetail, {
            as: 'cableDetail',
            foreignKey: 'products_id'
        })
        Product.hasOne(models.CuerdaDetail, {
            as: 'cuerdaDetail',
            foreignKey: 'products_id'
        })
        Product.hasOne(models.PedalDetail, {
            as: 'pedalDetail',
            foreignKey: 'products_id'
        })
        
        Product.belongsTo(models.Marca, {
            as: 'marca',
            foreignKey: 'marcas_id'
        })
        
        Product.belongsTo(models.Subcategory, {
            as: 'subcategories',
            foreignKey: 'subcategories_id'
        })

        Product.hasMany(models.ProductImage, {
            as: 'productsImages',
            foreignKey: 'products_id'
        })
    }


    

    return Product;
}