module.exports = (sequelize, dataTypes) => {
    let alias = 'Subcategory';
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true, 
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        categories_id: {
            type: dataTypes.INTEGER(11),
        },
    }
    let config = {
        tableName: 'subcategories',
        timestamps: false,
    }

    const Subcategory = sequelize.define(alias, cols, config);

    Subcategory.associate = (models) => {
        
        
        Subcategory.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'categories_id',
        });
        
        Subcategory.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'subcategories_id',
        });
    }

    return Subcategory;
}