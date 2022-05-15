module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define('activity', {
        title: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
    });
    return Activity;
};
