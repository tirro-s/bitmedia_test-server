const Sequelize = require('sequelize');

module.exports = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './data/database.sqlite',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
    define: {
        timestamps: false
    }
});