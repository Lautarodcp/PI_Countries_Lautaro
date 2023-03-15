const { DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('tours',{
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty:{
            type: DataTypes.ENUM("1", "2", "3", "4", "5"),
            allowNull: false,
        },
        duration:{
            type: DataTypes.STRING,
        },
        season:{
            type: DataTypes.ENUM("verano", "otoño", "invierno", "primavera"),
            allowNull: false,
        }
    },
    {timestamps: false}
    );
};