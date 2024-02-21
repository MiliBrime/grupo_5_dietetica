module.exports = (sequelize, dataTypes) => {
    let alias = "Category";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: dataTypes.STRING
        }
    };

    let config = {
        tableName: "categories",
        timestamps: false
    };

    const Category = sequelize.define(alias, cols, config);
    return Category;
}