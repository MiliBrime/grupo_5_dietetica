module.exports = (sequelize, dataTypes) => {
    let alias = "Brand";
    let cols = {
        id: {
            autoincrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: dataTypes.STRING
        }
    };

    let config = {
        tableName: "brands",
        timestamps: false
    };

    const Brand = sequelize.define(alias, cols, config)
    return Brand;
}