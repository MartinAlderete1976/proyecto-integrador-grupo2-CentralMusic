module.exports = (sequelize, dataTypes) => {
    let alias = 'User'
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        user: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        last_name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(45),
            allowNull: false,
            unique: true,
        },
        password: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        avatar: {
            type: dataTypes.STRING(45),
        },
        user_rol_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
    }
    let config = {
        tableName: 'users',
        timestamps: false,
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.belongsTo(models.UserRol, {
            as: 'rol',
            foreignKey: 'user_rol_id',
        });
    }

    return User;
}