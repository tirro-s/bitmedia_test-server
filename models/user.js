const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    gender: Sequelize.STRING,
    ip_address: Sequelize.STRING
});

module.exports = User;