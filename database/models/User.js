module.exports= (sequelize, dataTypes) => {
    let alias = "Users";
    let columns = {
        id:{
            autoincrement: true,
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
        phone:{
            type: dataTypes.STRING
        },
        email:{
            allowNull: false,
            type: dataTypes.STRING
        },
        password:{
            allowNull: false,
            type: dataTypes.STRING
        },
        photo:{
            type: dataTypes.STRING
        }
    };
    let config = { tableName: "Users", timestamps: false };
    
    const User= sequelize.define (alias,columns,config)
	return User; 
}