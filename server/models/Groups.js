module.exports = (sequelize, DataTypes) => {
    const Groups = sequelize.define("Groups", {
        groupName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        major: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gradeLevel: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        leader: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // public: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: false
        // },
        // notificationSetting: {
        //     type: DataTypes.ENUM('Week', 'Day', 'Hour'),
        //     defaultValue: 'Day'
        // }
    });

    Groups.associate = (models) => {
        Groups.hasMany(models.Chats, {
            onDelete: 'cascade',
        });
    };

    Groups.associate = (models) => {
        Groups.hasMany(models.Users, {});
    };
    
    return Groups;
};