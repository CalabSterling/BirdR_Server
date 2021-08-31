module.exports = (sequelize, DataTypes) => {
    const Sighting = sequelize.define('sighting', {
        bird: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return Sighting;
}