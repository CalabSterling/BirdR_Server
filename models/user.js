//const { DATEONLY } = require("sequelize/types")

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        passwordhash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        /*birthday: {
            type: DATEONLY,
            allowNull: true,
        }*/
    })
    return User;
}