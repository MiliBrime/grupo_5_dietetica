module.exports = (sequelize, dataTypes) => {
    let alias = "Address";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        address: {
            type: dataTypes.STRING,
            allowNull: false
        },
        zip_code: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        tableName: "addresses",
        timestamps: false
    };

    const Address = sequelize.define(alias, cols, config);
    return Address;
}