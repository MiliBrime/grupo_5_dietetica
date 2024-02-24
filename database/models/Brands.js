module.exports = (sequelize, dataTypes) => {
    let alias = "Brand";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: dataTypes.STRING,
        }
    };

    let config = {
        tableName: "brands",
        timestamps: false
    };

    const Brand = sequelize.define(alias, cols, config)

    Brand.associate = function(models) {
        Brand.hasMany(models.Product, {
            as: 'products', 
            foreignKey: 'brand_id'
        })};

    return Brand;
}