const dbConfig = require('../config/database');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.activity = require('./activity.model.js')(sequelize, Sequelize);
db.todo = require('./todo.model.js')(sequelize, Sequelize);
db.activity.hasMany(db.todo, { as: 'todo_items', foreignKey: 'activity_group_id' });
db.todo.belongsTo(db.activity, { foreignKey: 'activity_group_id' });

module.exports = db;
