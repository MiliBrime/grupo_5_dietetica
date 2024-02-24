module.exports= (sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        first_name: {
            allowNull: false,
            type: dataTypes.STRING
        },
        last_name: {
            allowNull: false,
            type: dataTypes.STRING
        },
        phone: {
            allowNull: false,
            unique: true,
            type: dataTypes.STRING,
        },
        email: {
            allowNull: false,
            unique: true,
            type: dataTypes.STRING
        },
        password: {
            allowNull: false,
            type: dataTypes.STRING
        },
        photo: {
            type: dataTypes.STRING
        },
    };
    let config = {
        tableName: "users",
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config)
    
    User.associate = function(models){
        
        User.hasMany(models.Address, {as: "addresses", foreignKey: "user_id"}),
        
        User.belongsToMany(models.Role,{
            as: "roles",
            through: "User_role",
            foreignKey: "role_id",
            otherKey: "user_id",
            timestamps: false
        })
    }

    return User;
}