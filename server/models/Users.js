module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    Users.associate = (models) => {
        Users.hasMany(models.Groups, {});
    };
    return Users;
}