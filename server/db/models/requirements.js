const Sequelize = require('sequelize');
const db = require('../db');



var Requirement = db.define('requirement', {
    type: {
        type: Sequelize.ENUM('distance', 'speed'), //possibly string
        allowNull: false
    },
    goal: {
        type: Sequelize.STRING,
        allowNull: false
    },

});



module.exports = Requirement
