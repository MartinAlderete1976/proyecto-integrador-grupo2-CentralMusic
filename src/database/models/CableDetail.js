module.exports = (sequelize, dataTypes) => {
    let alias = 'CableDetail';
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true, 
            autoIncrement: true,
            allowNull: false,
        },
        conector_entrada: {
            type: dataTypes.STRING(45),
        },
        conector_salida: {
            type: dataTypes.STRING(45),
        },
        largo: {
            type: dataTypes.STRING(45),
        },
        products_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        }
    }
    let config = {
        tableName: 'cables_details',
        timestamps: false,
    }


    const CableDetail = sequelize.define(alias, cols, config);

    CableDetail.associate = (models) => {
        CableDetail.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'products_id',
        });
    }


    return CableDetail;
}