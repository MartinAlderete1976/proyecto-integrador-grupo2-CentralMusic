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
        Product.belongsTo(models.Subcategory, {
            as: 'subcategory',
            foreignKey: 'subcategories_id'
        });
        Product.belongsTo(models.Marca, {
            as: 'marca',
            foreignKey: 'marcas_id'
        });
        Product.hasMany(models.GuitarDetail, {
            as: 'guitarDetails',
            foreignKey: 'products_id',
        });
        Product.hasMany(models.CuerdaDetail, {
            as: 'cuerdaDetails',
            foreignKey: 'products_id'
        });
        Product.hasMany(models.PedalDetail, {
            as: 'pedalDetails',
            foreignKey: 'products_id'
        });
        Product.hasMany(models.CableDetail, {
            as: 'cableDetails',
            foreignKey: 'products_id',
        });
        Product.hasMany(models.ProductImage, {
            as: 'productImage',
            foreignKey: 'products_id',
        });

    }

    

    return Product;
}