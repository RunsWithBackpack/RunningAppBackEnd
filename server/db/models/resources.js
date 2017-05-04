const Sequelize = require('sequelize');
const db = require('../db');

const Resource = db.define('resource', {
	type: {
		type: Sequelize.ENUM('health', 'medical', 'weapons'),
		allowNull: false, 
	}, 
	total: {
		type: Sequelize.INTEGER,
		allowNull: false, 
	}


})

module.exports = Resource