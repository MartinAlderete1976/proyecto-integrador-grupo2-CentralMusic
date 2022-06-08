module.exports = (sequelize, dataTypes) => {
    let alias = 'GuitarDetail';
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        model: {
            type: dataTypes.STRING(45),
            allowNull: false,

        },
        line: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        body_finish: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        material_body: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        hand: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        color: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        material_freboard: {
            type: dataTypes.STRING(45),
        },
        products_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
    }
    let config = {
        tableName: 'guitar_details',
        timestamps: false,
    }

    const GuitarDetail = sequelize.define(alias, cols, config);



    

    return GuitarDetail;
}