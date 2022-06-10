module.exports = (sequelize, dataTypes) => {
    let alias = 'UserRol';
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        rol_name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
    }
    let config = {
        tableName: 'user_rol',
        timestamps: false,
    }

    const UserRol = sequelize.define(alias, cols, config);

    UserRol.associate = (models) => {
        UserRol.hasMany(models.User, {
            as: 'user',
            foreignKey: 'user_rol_id',
        });
    }

    return UserRol;
}