module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            autoincrement: true,
            primaryKey: true,
            type: dataTypes.INTERGER
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        img: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        category_id: {
            type: dataTypes.INTERGER,
            allowNull: false,
        },
        brand_id: {
            type: dataTypes.INTERGER,
            allowNull: false,
        },
        price: {
            type: dataTypes.DECIMAL,
            allowNull: false,
        }
    };

    let config = {
        tableName: "products",
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);
    return Product;
}