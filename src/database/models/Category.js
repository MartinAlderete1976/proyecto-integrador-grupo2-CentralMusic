module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true, 
            autoIncrement: true,
            allowNull: false,
        },
        name_category: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
       
    }
    let config = {
        tableName: 'categories',
        timestamps: false,
    }


    const Category = sequelize.define(alias, cols, config);
    
    
    Category.associate = (models) => {
        Category.hasMany(models.Subcategory, {
            as: 'subcategories',
            foreignKey: 'categories_id',
        });
    }


    return Category;
}