module.exports = (sequelize, dataTypes) => {
    let alias = "User_role";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        user_id: {
            type: dataTypes.INTEGER
        },
        role_id: {
            type: dataTypes.INTEGER
        }
    };

    let config = {
        tableName: "user_role",
        timestamps: false
    };

    const User_role = sequelize.define(alias, cols, config);
    return User_role;
}