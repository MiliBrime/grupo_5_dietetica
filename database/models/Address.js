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
        },
        zip_code: {
            type: dataTypes.INTEGER,
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
    
    Address.associate = function(models){
        
        Address.belongsTo(models.User, {as: "users", foreignKey: "user_id"})
    }

    return Address;
}