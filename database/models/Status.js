module.exports = (sequelize, dataTypes) => {
    let alias = 'Status'
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        name: {
            allowNull: true,
            type: dataTypes.STRING
        }
    };

    let config = {
        tableName: 'status',
        timestamps: false
    };

    const Status = sequelize.define(alias, cols, config)

    Status.associate = function(models) {
        Status.hasMany(models.Product, {
            as: 'products', 
            foreignKey: 'status_id'
        }) 
    }

    return Status;
}