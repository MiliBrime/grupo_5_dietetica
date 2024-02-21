module.exports = (sequelize, dataTypes) => {
    let alias = "Role";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        type: {
            allowNull: false,
            type: dataTypes.INTEGER
        }
    };

    let config = {
        tableName: "roles",
        timestamps: false
    };

    const Role = sequelize.define(alias, cols, config);
    return Role;
}