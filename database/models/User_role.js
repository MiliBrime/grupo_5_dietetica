module.exports = (sequelize, dataTypes) => {
    let alias = "User_role";
    let cols = {
        id: {
            autoincrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        user_id: {
            type: dataTypes.INTEGER
        },
        rol_id: {
            type: dataTypes.INTEGER
        }
    };

    let config = {
        tableName: "user_role",
        timestamps: false
    };

    const User_rol = sequelize.define(alias, cols, config);
    return User_rol;
}