const Sequelize = require('sequelize');
const db = require('../db');

const League = db.define('league', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	score: {
		type: Sequelize.INTEGER,
		allowNull: false,
	}, 
})

module.exports = League