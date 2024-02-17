module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            autoincrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        first_name: {
            allowNull: false,
            type: dataTypes.STRING
        },
        last_name: {
            allowNull: false,
            type: dataTypes.STRING
        },
        phone: {
            allowNull: false,
            unique: true,
            type: dataTypes.STRING,
        },
        email: {
            allowNull: false,
            unique: true,
            type: dataTypes.STRING
        },
        password: {
            allowNull: false,
            type: dataTypes.STRING
        },
        photo: {
            type: dataTypes.STRING
        }
    };

    let config = {
        tableName: "Users",
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config)
    return User;
}