const Sequelize = require('sequelize');
const db = require('../db');

var Level = db.define('level', {
	name: {
		type: Sequelize.STRING,
		allowNull: false, 
	}, 
	lvl: {
		type: Sequelize.INTEGER,
		allowNull: false, 
	},
	
})

module.exports = Level