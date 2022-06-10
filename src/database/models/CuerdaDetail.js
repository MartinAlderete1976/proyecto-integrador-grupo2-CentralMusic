module.exports = (sequelize, dataTypes) => {
    let alias = 'CuerdaDetail';
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true, 
            autoIncrement: true,
            allowNull: false,
        },
        cantidad_cuerdas: {
            type: dataTypes.INTEGER(11),
            
        },
        tension: {
            type: dataTypes.STRING(45),
            
        },
        materiales: {
            type: dataTypes.STRING(45),
            
        },
        calibre: {
            type: dataTypes.STRING(45),
        },
        products_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        }
    }
    let config = {
        tableName: 'cuerdas_details',
        timestamps: false,
    }


    const CuerdaDetail = sequelize.define(alias, cols, config);

    CuerdaDetail.associate = (models) => {
        CuerdaDetail.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'products_id',
        });
    }


    return CuerdaDetail;
}