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
    
    Role.associate = function(models){
        Role.belongsToMany(models.User,{
            as: "users",
            through: "User_role",
            foreignKey: "user_id",
            otherKey: "role_id",
            timestamps: false
    })
}
    
    return Role;
}