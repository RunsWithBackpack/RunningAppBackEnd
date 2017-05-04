const Sequelize = require('sequelize');
const db = require('../db');



var Group = db.define('group', {
	name: {
		type: Sequelize.STRING,
		allowNull: false, 
	}, 
	health_total: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: 0,
	}, 
	weapon_total: {
		type: Sequelize.STRING,
		allowNull: false, 
		defaultValue: 0,
	}, 
	medical_total: {
		type: Sequelize.STRING,
		allowNull: false, 
		defaultValue: 0,
	}, 
})

module.exports = Group