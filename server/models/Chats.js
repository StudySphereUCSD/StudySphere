module.exports = (sequelize, DataTypes) => {
    const Chats = sequelize.define("Chats", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })


    Chats.associate = (models) => {
        // Associate Chats with Groups
        Chats.belongsTo(models.Groups, {
            foreignKey: 'GroupId', // This will create a GroupId column in Chats table
            onDelete: 'CASCADE'
        });
    };


    return Chats;
}