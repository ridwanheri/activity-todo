module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('todo', {
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        priority: { type: DataTypes.STRING, defaultValue: 'very-high' },
        title: {
            type: DataTypes.STRING,
        },
    });
    return Todo;
};
