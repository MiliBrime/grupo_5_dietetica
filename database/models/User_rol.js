module.exports = (sequelize, dataTypes) => {
    let alias = "User_rol";
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
        tableName: "user_rol",
        timestamps: false
    };

    const User_rol = sequelize.define(alias, cols, config);
    return User_rol;
}