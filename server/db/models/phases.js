const Sequelize = require('sequelize');
const db = require('../db');


var Phase = db.define('phase', {
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    }
})


module.exports = Phase
