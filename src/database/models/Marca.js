module.exports = (sequelize, dataTypes) => {
    let alias = 'Marca';
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        marca: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
    }
    let config = {
        tableName: 'marcas',
        timestamps: false,
    }

    const Marca = sequelize.define(alias, cols, config);
    
    
    Marca.associate = (models) => {
        Marca.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'marcas_id'
        });
    } 

    return Marca;
}