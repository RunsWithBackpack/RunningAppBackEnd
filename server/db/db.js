var Sequelize = require('sequelize');
var dbUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/capstone'
var db = new Sequelize(dbUrl);



module.exports = db
