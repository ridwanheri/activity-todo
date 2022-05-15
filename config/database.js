require('dotenv').config();

// create configuration for connection
const dbConfig = {
    HOST: process.env.MYSQL_HOST,
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASSWORD,
    DATABASE: process.env.MYSQL_DBNAME,
    dialect: 'mysql',
    // pool: {
    //     max: 20,
    //     min: 0,
    //     acquire: 30000,
    //     idle: 10000,
    // },
};

module.exports = dbConfig;
