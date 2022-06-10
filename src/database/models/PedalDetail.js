const data = require("../../data");

module.exports = (sequelize, dataTypes) => {
    let alias = 'PedalDetail';
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true, 
            autoIncrement: true,
            allowNull: false,
        },
        vocal: {
            type: dataTypes.STRING(10),
            
        },
        cantidad_efectos: {
            type: dataTypes.INTEGER(11),
            
        },
        instrumentos_compatibles: {
            type: dataTypes.STRING(45),
            
        },
        tipo_de_efectos: {
            type: dataTypes.STRING(45),
        },
        voltaje: {
            type: dataTypes.STRING(45),
        },
        tecnologia: {
            type: dataTypes.STRING(45),
        },
        alimentacion: {
            type: dataTypes.STRING(45),
        },
        products_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        }
    }
    let config = {
        tableName: 'pedal_details',
        timestamps: false,
    }


    const PedalDetail = sequelize.define(alias, cols, config);

    PedalDetail.associate = (models) => {
        PedalDetail.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'products_id'
        });
    }


    return PedalDetail;

}