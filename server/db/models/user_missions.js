const Sequelize = require('sequelize');
const db = require('../db');


var User_Mission = db.define('user_mission', { 
	time: {
		type: Sequelize.DECIMAL, //maybe can use time
		allowNull: false, 
	}, 
	distance: {
		type: Sequelize.DECIMAL,
		allowNull: false, 
	}
})

module.exports = User_Mission