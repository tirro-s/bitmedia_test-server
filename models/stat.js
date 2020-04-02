const Sequelize = require('sequelize');
const db = require('../config/database');

const Stat = db.define('stat', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        foreignKey: true
    },
    date: Sequelize.DATE,
    page_views: Sequelize.INTEGER,
    clicks: Sequelize.INTEGER
});

module.exports = Stat;