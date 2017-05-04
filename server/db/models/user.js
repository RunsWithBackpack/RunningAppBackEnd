const Sequelize = require('sequelize');
const db = require('../db');


var User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    username: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
    },

});






module.exports = User
