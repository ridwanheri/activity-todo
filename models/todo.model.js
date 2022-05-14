module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('todo', {
        is_active: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        priority: { type: DataTypes.STRING },
        title: {
            type: DataTypes.STRING,
        },
    });
    return Todo;
};
