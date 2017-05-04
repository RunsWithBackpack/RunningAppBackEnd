const Sequelize = require('sequelize');
const db = require('../db');


const Mission = db.define('mission', {
	name: {
		type: Sequelize.STRING,
		allowNull: false, 
	}, 
	goal: {
		type: Sequelize.STRING,
	},
	amount: {
		type: Sequelize.INTEGER,
	}
})

module.exports = Mission