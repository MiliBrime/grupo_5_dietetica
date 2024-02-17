module.exports = (sequelize, dataTypes) => {
    let alias = "Rols";
    let cols = {
        id: {
            autoincrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        type_rol: {
            allowNull: false,
            type: dataTypes.INTEGER
        }
    };

    let config = {
        tableName: "rols",
        timestamps: false
    };

    const Rol = sequelize.define(alias, cols, config);
    return Rol;
}